import { useContext } from "react";
import { NostrContext } from "./Nostr";

const useNostr = () => useContext(NostrContext);

export { useNostr };
