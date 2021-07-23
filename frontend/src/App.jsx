import React from 'react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './pages/Landing';
import ErrorBoundary from './errorBoundary';

const link = createHttpLink({
    uri: process.env.LOCAL ? "http://localhost:49160/graphql" : "https://dev.weathernow.gq/graphql",
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
                <ErrorBoundary>
                    <Landing/>
                </ErrorBoundary>
            </ApolloProvider>
        </Router>
    )
}

export default App;