import * as React from 'react'
import ReputationSystemArtifact from "../../contracts-abi/ReputationSystem.json"
import ReputationSystemAddress from "../../contracts-abi/ReputationSystem_address.json"
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export default function RegisterNostrKeyComponent() {
  const { isConnected } = useAccount()
  const [token, setToken] = React.useState('')

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
      <span>Not connected to blockchain</span>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
      <label htmlFor="tokenId">Token ID</label>
      <input
        id="tokenId"
        onChange={(e) => setToken(e.target.value)}
        placeholder="420"
        value={token}
      />
      <button disabled={!write}>Submit</button>
    </form>
  )
}