import { Event, Filter } from "nostr-tools";
import { useEffect, useState } from "react";
import { makeUniqueEvents } from "../utils/nostr";
import { useNostr } from "./useNostr";

const useNostrRead = (dataFilters: Filter[]) => {
  const [fetchedData, setFetchedData] = useState<Event[]>();
  const nostr = useNostr();

  useEffect(() => {
    const relay = nostr?.relay;
    if (!relay) {
      console.warn("Not connected to nostr relay yet.");
      return;
    }

    const initializeData = async () => {
      if (relay !== null && nostr?.nostrAccountKeypair?.pubKey !== undefined) {
        const events = await relay.list(dataFilters);
        setFetchedData((currentEvents) =>
          currentEvents
            ? makeUniqueEvents([...currentEvents, ...events])
            : events
        );
      }
    };

    // Fetches initial data
    if (fetchedData === undefined) {
      initializeData();
    }
  }, [dataFilters, nostr?.relay, nostr?.nostrAccountKeypair, fetchedData]);

  useEffect(() => {
    const relay = nostr?.relay;
    if (!relay) {
      console.warn("Not connected to nostr relay yet.");
      return;
    }

    const subscription = nostr.relay?.sub(dataFilters);
    // Opens websocket to get new events instantly
    subscription?.on("event", (event: Event) => {
      setFetchedData((currentEvents) =>
        currentEvents ? makeUniqueEvents([...currentEvents, event]) : [event]
      );
    });

    return () => {
      subscription?.unsub();
    };
  }, [dataFilters, nostr?.nostrAccountKeypair, nostr?.relay]);

  return fetchedData;
};

export { useNostrRead };
