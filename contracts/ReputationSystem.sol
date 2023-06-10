// SPDX-License-Identifier: cc0
pragma solidity ^0.8.0;

// TODO: optimize struct to take less storage
struct Content {
    address creator;
    int256 score;
    uint256 unlockTimestamp;
    bool isProcessed; // true IF the content has been processed (author's reputation was updated), FALSE otherwise
}

struct ContentVote {
    uint256 lockedAmount;
    bool approve;
}

contract ReputationSystem {
    uint256 LOCKED_AMOUNT_VOTING_WEI_DENOMINATOR = 10 ** 13;
    mapping(string => address) public nostrKeyToAccount;
    mapping(address => string) public accountToNostrKey;

    mapping(address => int256) public accountReputation;
    mapping(address => mapping(string => ContentVote)) public lockedVotes; // account -> nostr content id -> locked amount

    mapping(string => Content) public nostrIdToContent; // nostr content id -> content

    modifier hasNostrKeyRegistered() {
        bytes memory nostrKeyOfAccount = bytes(accountToNostrKey[msg.sender]);
        require(
            nostrKeyOfAccount.length != 0,
            "Account did not register a nostr key yet"
        );
        _;
    }

    modifier isRegisteredContent(string memory nostrId) {
        Content memory content = nostrIdToContent[nostrId];
        require(
            content.creator != address(0),
            "Content with this nostr id is not registered yet"
        );
        _;
    }

    // Register nostr key with ethereum account
    function registerNostrKey(string memory nostrKey) external {
        address ownerOfNostrKey = nostrKeyToAccount[nostrKey];
        bytes memory nostrKeyOfAccount = bytes(accountToNostrKey[msg.sender]);
        require(
            nostrKeyOfAccount.length == 0,
            "Account already registered a key"
        );
        require(ownerOfNostrKey == address(0), "Nostr key already registered");
        nostrKeyToAccount[nostrKey] = msg.sender;
        accountToNostrKey[msg.sender] = nostrKey;
    }

    // Compute how much score will be added based on user's reputation
    // and amount they lock
    function computeScoreVotingPower(
        address account,
        uint256 amount
    ) public view returns (uint256) {
        int256 reputation = accountReputation[account];
        // TODO: handle this in more sophisticated way - e.g. with logarithmic fn
        // 1_000 = 1; 4 decimals
        // Minimum amount to lock is 0.00001 ether;

        if (reputation < -1000 || amount < 0.00001 ether) {
            return 0;
        }
        return
            (uint256(int256(1000 + reputation)) * amount) /
            LOCKED_AMOUNT_VOTING_WEI_DENOMINATOR /
            1000;
    }

    function registerContent(
        string memory nostrContentId
    ) external hasNostrKeyRegistered {
        Content memory content = nostrIdToContent[nostrContentId];
        require(
            content.creator != address(0),
            "Content with this nostr id is registered already"
        );

        uint256 unlockingTimestamp = block.timestamp + 7 days;
        Content memory newContentEntry = Content(
            msg.sender,
            0,
            unlockingTimestamp,
            false
        );
        nostrIdToContent[nostrContentId] = newContentEntry;
    }

    // Locks user's tokens on voting
    function voteOnContent(
        string memory nostrContentId,
        bool approve
    )
        external
        payable
        hasNostrKeyRegistered
        isRegisteredContent(nostrContentId)
        returns (uint256)
    {
        // LOCK TOKENS AND ADD VOTES ON CONTENT
        require(
            msg.value > 0.00001 ether,
            "Minimum amount to lock is 0.00001 eth."
        );
        require(
            nostrIdToContent[nostrContentId].unlockTimestamp > block.timestamp,
            "Voting period has ended already"
        );
        // Register locked funds
        lockedVotes[msg.sender][nostrContentId] = ContentVote(
            msg.value,
            approve
        );

        // 0.00001 ETH = 1 content score point -> min amount
        uint256 scoreToAdd = computeScoreVotingPower(msg.sender, msg.value);

        // Increase or decrease based on
        nostrIdToContent[nostrContentId].score += approve
            ? int(scoreToAdd)
            : (-1 * int(scoreToAdd));

        return scoreToAdd;
    }

    function processContentScore(string memory nostrContentId) public {
        Content storage content = nostrIdToContent[nostrContentId];
        if (content.isProcessed) {
            return;
        }

        accountReputation[content.creator] += content.score;
        content.isProcessed = true;
    }

    function unlockFunds(
        string memory nostrContentId
    ) external isRegisteredContent(nostrContentId) {
        Content storage content = nostrIdToContent[nostrContentId];
        // Check that voting deadline has passed
        require(
            content.unlockTimestamp < block.timestamp,
            "Cannot unlock staked amount yet"
        );

        // Unlock and overwrite storage to prevent reentrancy
        uint lockedAmount = lockedVotes[msg.sender][nostrContentId]
            .lockedAmount;
        lockedVotes[msg.sender][nostrContentId].lockedAmount = 0;
        require(lockedAmount > 0, "No locked amount found or already claimed");

        // Pay outstanding locked funds
        (bool sent, ) = msg.sender.call{value: lockedAmount}("");
        require(sent);

        // Modify user's reputation based on his voting
        bool votedWithMajority = content.score >= 0 &&
            lockedVotes[msg.sender][nostrContentId].approve;
        accountReputation[msg.sender] += votedWithMajority
            ? int(lockedAmount)
            : (-1 * int(lockedAmount));

        // Modify content author's reputation
        processContentScore(nostrContentId);
    }
}
