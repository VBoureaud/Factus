import {
  Relay,
  relayInit,
  generatePrivateKey,
  getPublicKey,
} from "nostr-tools";
import { createContext, ReactNode, useEffect, useState } from "react";

const NOSTR_URL = "wss://nostr-pub.wellorder.net ";

const NostrContext = createContext<{relay: Relay | null, nostrAccountKeypair: NostrAccountKeypair | null} | null>(null);

interface NostrAccountKeypair {
  pubKey: string,
  privKey: string
}

const generateNostrAccountKeypair = (): NostrAccountKeypair => {
  const privKey = generatePrivateKey(); // `sk` is a hex string
  const pubKey = getPublicKey(privKey); // `pk` is a hex string
  return { pubKey, privKey };
};


const NostrProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [relay, setRelay] = useState<Relay | null>(null);
  const [nostrAccountKeypair, setNostrAccountKeypair] = useState<NostrAccountKeypair | null>(null);

  useEffect(() => {
    const initializeRelay = async () => {
      const nostrRelay = relayInit(NOSTR_URL);
      await nostrRelay.connect();
      console.log(
        "Successfully established connection with nostr relay",
        NOSTR_URL
      );
      setRelay(nostrRelay);
    };

    if (relay === null) {
      initializeRelay();
    }

    return () => {
      if (relay !== null) {
        relay.close();
      }
    };
  }, [relay]);

  useEffect(() => {
    const foundAccountPrivateKey = localStorage.getItem("nostr-account-privatekey");
    if (foundAccountPrivateKey === null) {
      const newAccountKeypair = generateNostrAccountKeypair();
      localStorage.setItem("nostr-account-privatekey", newAccountKeypair.privKey);
      setNostrAccountKeypair(newAccountKeypair);
    } else {
      const accountKeypair = {
        pubKey: getPublicKey(foundAccountPrivateKey),
        privKey: foundAccountPrivateKey
      }
      setNostrAccountKeypair(accountKeypair)
    }
  }, []);

  return (
    <NostrContext.Provider value={{relay, nostrAccountKeypair}}>{children}</NostrContext.Provider>
  );
};

export { NostrProvider, NostrContext };
