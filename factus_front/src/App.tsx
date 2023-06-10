import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Template from './components/Template'
import { Web3ContextProvider } from "./store/web3Context";
import './App.css'
import { NostrProvider } from './contexts/Nostr'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
//import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: '' }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <NostrProvider>
     <ChakraProvider>
        <Web3ContextProvider>
          <WagmiConfig config={config}>
            <Template>
              <Router>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                </Routes>
              </Router>
            </Template>
          </WagmiConfig>
        </Web3ContextProvider>
      </ChakraProvider>
    </NostrProvider>
  )
}

export default App
