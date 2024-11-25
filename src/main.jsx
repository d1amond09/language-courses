import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
