import { Relay, relayInit } from "nostr-tools";
import { createContext, ReactNode, useEffect, useState } from "react";

const NOSTR_URL = "wss://nostr-pub.wellorder.net ";

const NostrContext = createContext<Relay | null>(null);

const NostrProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [relay, setRelay] = useState<Relay | null>(null);

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

  return (
    <NostrContext.Provider value={relay}>{children}</NostrContext.Provider>
  );
};

export { NostrProvider , NostrContext  };
