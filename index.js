/** @format */

import { AppRegistry } from "react-native";
import App from "./app";
import { name as appName } from "./app.json";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const ApolloApp = () => {
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>;
};

AppRegistry.registerComponent(appName, () => App);
