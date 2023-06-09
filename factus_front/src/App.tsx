import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Template from './components/Template'
import './App.css'
import { NostrProvider } from './contexts/Nostr'

function App() {
  return (
    <NostrProvider>
     <ChakraProvider>
        <Template>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </Router>
        </Template>
      </ChakraProvider>
    </NostrProvider>
  )
}

export default App
