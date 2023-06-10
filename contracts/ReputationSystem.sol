pragma solidity ^0.8.0;

// TODO: optimize struct to take less storage
struct Content {
    address creator;
    int256 score; 
    uint256 unlockTimestamp;
    bool isProcessed; // true IF the content has been processed (author's reputation was updated), FALSE otherwise
}

contract ReputationSystem {

    mapping (string => address) public nostrKeyToAccount;
    mapping (address => string) public accountToNostrKey;

    mapping (address => int128) public accountReputation;
    mapping (address => mapping (string => uint256)) public lockedAmounts; // account -> nostr content id -> locked amount

    mapping (string => Content) public nostrIdToContent; // nostr content id -> content

    modifier hasNostrKeyRegistered  {
        bytes memory nostrKeyOfAccount = bytes(accountToNostrKey[msg.sender]);
        require(nostrKeyOfAccount.length != 0, "Account did not register a nostr key yet");
        _;
    }

    modifier isRegisteredContent (string memory nostrId) {
        Content memory content = nostrIdToContent[nostrId];
        require(content.creator != address(0), "Content with this nostr id is not registered yet");
        _;
    }

    // 
    function registerNostrKey(string memory nostrKey) external  {
        address ownerOfNostrKey = nostrKeyToAccount[nostrKey];
        bytes memory nostrKeyOfAccount = bytes(accountToNostrKey[msg.sender]);
        require(nostrKeyOfAccount.length == 0, "Account already registered a key");
        require(ownerOfNostrKey == address(0), "Nostr key already registered");
        nostrKeyToAccount[nostrKey] = msg.sender;
        accountToNostrKey[msg.sender] = nostrKey;
    }

    // Compute how much score will be added based on user's reputation
    // and amount they lock
    function computeScoreVotingPower(address account, uint256 amount) public view returns (uint256) {
        int128 reputation = accountReputation[account];
        // TODO: handle this in more sophisticated way - e.g. with logarithmic fn
        // 1_000 = 1; 4 decimals
        // Minimum amount to lock is 0.00001 ether;
        uint256 reputationWeiDenominator = 10**13;
        if (reputation < -1000 || amount < 0.00001 ether) {
            return 0;
        }
        return uint(int(1000 + reputation)) * amount / reputationWeiDenominator / 1000 ;
    }

    function registerContent(string memory nostrContentId) external {
        Content memory content = nostrIdToContent[nostrContentId];
        require(content.creator != address(0), "Content with this nostr id is registered already");
        
        uint256 unlockingTimestamp  = block.timestamp + 7 days;
        Content memory newContentEntry = Content(msg.sender, 0, unlockingTimestamp, false);
        nostrIdToContent[nostrContentId] = newContentEntry;
    }

    function voteOnContent(string memory nostrContentId, bool approve) external payable isRegisteredContent(nostrContentId) {
        // LOCK TOKENS AND ADD VOTES ON CONTENT
        require(msg.value > 0.00001 ether, "Minimum amount to lock is 0.00001 eth.");
        // Register locked funds
        lockedAmounts[msg.sender][nostrContentId] = msg.value;

        // 0.00001 ETH = 1 content score point -> min amount
        uint256 scoreToAdd = computeScoreVotingPower(msg.sender, msg.value);

        // Increase or decrease based on
        nostrIdToContent[nostrContentId].score += approve ? int(scoreToAdd) : (-1 * int(scoreToAdd));
    }

    function processContentScore(string memory nostrContentId) public {
        // CHECK: hasn't been processed

        // handle points to author
    }

    function unlockFunds(string memory nostrContentId) external isRegisteredContent(nostrContentId) {
        // unlocks funds and increase/decrease reputation of account
        // IF it's the first unlock for content then increase/decrease reputation of author 
    }


}