import * as React from 'react'
import ReputationSystemArtifact from "../../contracts-abi/ReputationSystem.json"
import ReputationSystemAddress from "../../contracts-abi/ReputationSystem_address.json"
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useNostr } from '../../contexts/useNostr';

export default function RegisterNostrKeyComponent() {
  const { isConnected } = useAccount()
  const [token, setToken] = React.useState('')
  const nostr = useNostr();

  React.useEffect(() => {
    if (nostr?.nostrAccountKeypair?.pubKey)
      setToken(nostr?.nostrAccountKeypair?.pubKey);
  }, [nostr]);

  const { config } = usePrepareContractWrite({
    address: ReputationSystemAddress.Contract,
    abi: ReputationSystemArtifact,
    functionName: 'registerNostrKey',
    args: [token],
    enabled: Boolean(token),
  });
  const { write } = useContractWrite(config)

  if (!isConnected)
    return (
      <>
        <h3 style={{ fontSize: '22px' }}>Register Account to NoStr</h3>
        <span>Not connected to blockchain</span>
      </>
    );

  return (
    <>
      <h3 style={{ fontSize: '22px' }}>Register Account to NoStr</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <label htmlFor="token">Key: </label>
        <input
          id="token"
          onChange={(e) => setToken(e.target.value)}
          placeholder="7edd...759f"
          value={token}
        />
        <button style={{ marginLeft: '5px' }} disabled={!write}>Submit</button>
      </form>
    </>
  )
}