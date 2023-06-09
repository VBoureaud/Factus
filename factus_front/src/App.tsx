import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Template from './components/Template'
import './App.css'

function App() {
  return (
    <>
     <ChakraProvider>
        <Template>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </Router>
        </Template>
      </ChakraProvider>
    </>
  )
}

export default App
