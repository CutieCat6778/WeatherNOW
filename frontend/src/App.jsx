import React from 'react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './pages';

const link = createHttpLink({
    uri: process.env.BACKEND_URL+"/graphql",
    credentials: 'include'
})

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <Routers/>
            </ApolloProvider>
        </Router>
    )
}

export default App;