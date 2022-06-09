import ReactDOM from 'react-dom'
import App from './App'

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'

// The client is needed to send queries to the server
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    })
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
