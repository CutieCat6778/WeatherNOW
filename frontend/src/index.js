import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import App from './App'
import registerServiceWorker from './serviceWorker';

ReactDOM.render(
    <ChakraProvider>
        <CSSReset/>
        <App/>
    </ChakraProvider>
, document.getElementById('root'))
registerServiceWorker();