import { Button, Textarea } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { useNostr } from "../contexts/useNostr";

import { useNostrRead } from "../contexts/useNostrRead";
import { demoEventConstructor, eventsFilterByAccountConstructor } from "../utils/nostr";

import Web3Context from "../store/web3Context";

const Home = () => {
  const [inputData, setInputData] = useState();
  const [loading, setLoading] = useState(false);
  const nostr = useNostr();
  const relayedData = useNostrRead(eventsFilterByAccountConstructor(nostr?.nostrAccountKeypair?.pubKey))

  const {
    contract,
    initContract,
  } = useContext(Web3Context);

  // DidMount
  useEffect(() => {
    console.log('init');
    initContract();
  }, []);

  useEffect(() => {
    console.log({ contract });
    if (contract) {
      const e = contract.accountReputation();
      console.log({ e });
    }
  }, [contract]);

  const handleFormSubmission = async () => {
    const event = demoEventConstructor(inputData || "")
    setLoading(true)
    await nostr?.writeToNostr(event);
    setLoading(false)
  };

  const handleInputDataChange = (event: any) => {
    setInputData(event.target.value);
  };


  return (
    <div>
      <h1>Home</h1>
      <form>
        <Textarea
          value={inputData}
          onChange={handleInputDataChange}
          placeholder="Put your verification here."
        ></Textarea>
        <Button onClick={handleFormSubmission}>{loading ? "Submitting..." : "Submit"}</Button>
      </form>
      {JSON.stringify(relayedData)}
    </div>
  );
};
export default Home;
