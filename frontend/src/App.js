import Main from './components/MainComponent';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <div>
        <Main />
      </div>      
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
