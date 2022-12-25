import "./App.css";
import FetchData from "./fetchData";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
/* useQuery fetches data from api whenever component renders */

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <FetchData />
      </div>
    </ApolloProvider>
  );
}

export default App;
