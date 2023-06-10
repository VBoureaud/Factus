import { Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import { useNostr } from "../contexts/useNostr";

import { useNostrRead } from "../contexts/useNostrRead";
import { demoEventConstructor, eventsFilterByAccountConstructor } from "../utils/nostr";

const Home = () => {
  const [inputData, setInputData] = useState();
  const [loading, setLoading] = useState(false);
  const nostr = useNostr();
  const relayedData = useNostrRead(eventsFilterByAccountConstructor(nostr?.nostrAccountKeypair?.pubKey))

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
