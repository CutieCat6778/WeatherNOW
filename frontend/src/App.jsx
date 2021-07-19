import React from 'react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './pages';

const link = createHttpLink({
    uri: process.env.LOCAL ? "http://localhost:49160/graphql" : "https://10.8.2.80/graphql",
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