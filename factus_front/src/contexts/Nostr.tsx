import {
  Relay,
  relayInit,
  getPublicKey,
  getEventHash,
  getSignature,
} from "nostr-tools";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NostrAccountKeypair } from "../types/nostr";
import { generateNostrAccountKeypair } from "../utils/nostr";

const NOSTR_URL = "wss://nostr-pub.wellorder.net ";

const NostrContext = createContext<{
  relay: Relay | null;
  nostrAccountKeypair: NostrAccountKeypair | null;
  writeToNostr: (event: any) => Promise<any>; // TODO: fix typings
} | null>(null);

const NostrProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [relay, setRelay] = useState<Relay | null>(null);
  const [nostrAccountKeypair, setNostrAccountKeypair] =
    useState<NostrAccountKeypair | null>(null);

  useEffect(() => {
    const initializeRelay = async () => {
      const nostrRelay = await relayInit(NOSTR_URL);
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
    const foundAccountPrivateKey = localStorage.getItem(
      "nostr-account-privatekey"
    );
    if (foundAccountPrivateKey === null) {
      const newAccountKeypair = generateNostrAccountKeypair();
      localStorage.setItem(
        "nostr-account-privatekey",
        newAccountKeypair.privKey
      );
      setNostrAccountKeypair(newAccountKeypair);
    } else {
      const accountKeypair = {
        pubKey: getPublicKey(foundAccountPrivateKey),
        privKey: foundAccountPrivateKey,
      };
      setNostrAccountKeypair(accountKeypair);
    }
  }, []);

  /**
   * Adds pubkey, id, signature to event and tries to publish it.
   */
  const writeToNostr = useCallback(
    (event: any /* TODO: fix nostr event typings */) =>
      new Promise((resolve, reject) => {
        if (
          !nostrAccountKeypair?.pubKey === undefined ||
          nostrAccountKeypair?.privKey === undefined
        ) {
          return reject("Nostr account not initialized");
        }
        if (relay === null) {
          return reject("Nostr relay not connected");
        }

        const eventWithPubKey = {
          ...event,
          pubkey: nostrAccountKeypair.pubKey,
        };

        const finalEvent = {
          ...eventWithPubKey,
          id: getEventHash(eventWithPubKey),
          sig: getSignature(eventWithPubKey, nostrAccountKeypair.privKey),
        };

        // Sign event
        const pub = relay.publish(finalEvent);

        pub.on("ok", () => {
          console.log(`Event ${finalEvent.id} has been relayed`);
          resolve(undefined);
        });

        pub.on("failed", (reason: any /* TODO: fix typings */) => {
          reject(`Failed publishing ${finalEvent.id} because of:${reason}`);
        });
      }),
    [nostrAccountKeypair, relay]
  );

  return (
    <NostrContext.Provider
      value={{
        relay,
        nostrAccountKeypair,
        writeToNostr,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
};

export { NostrProvider, NostrContext };
