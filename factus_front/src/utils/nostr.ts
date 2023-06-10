import { generatePrivateKey, getPublicKey, Event } from "nostr-tools";
import { NostrAccountKeypair } from "../types/nostr";

const generateNostrAccountKeypair = (): NostrAccountKeypair => {
  const privKey = generatePrivateKey(); // `sk` is a hex string
  const pubKey = getPublicKey(privKey); // `pk` is a hex string
  return { pubKey, privKey };
};

const eventsFilterByAccountConstructor = (acc?: string): any => [
  {
    // kinds: [1],
    authors: [acc],
    // TODO: add event filtering
    // "#i": allInscriptions.map(({ id }) => id),
  },
];

const demoEventConstructor = (content: string) => {
  return {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content,
  };
};

const makeUniqueEvents = (events: Event[]): Event[] => {
  const uniqueEvents = {} as any;
  for (const ev of events) {
    ev;
    if (uniqueEvents[ev.id] === undefined) {
      uniqueEvents[ev.id] = ev;
    }
  }
  return Object.values(uniqueEvents);
};

export {
  eventsFilterByAccountConstructor,
  generateNostrAccountKeypair,
  demoEventConstructor,
  makeUniqueEvents,
};
