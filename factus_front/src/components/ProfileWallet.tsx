import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
 
import {
  Button,
} from '@chakra-ui/react';

export default function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
 
  if (isConnected) {
    return (
      <div>
        <div><b>OnChain</b>: {ensName ? `${ensName} (${address})` : `${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</div>
        {/*<div>Connected to {connector && connector.name}</div>*/}
        <div onClick={disconnect} style={{ cursor: 'pointer' }}>Disconnect</div>
      </div>
    )
  }
 
  return (
    <div>
      {connectors.map((connector) => (
        <Button
          colorScheme='blue'
          ml={2}
          mr={2}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect with {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
 
      {error && <div>{error.message}</div>}
    </div>
  )
}