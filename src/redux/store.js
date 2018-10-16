import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { reducer } from "./reducer";
import { createStore } from "redux";

const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql"
  uri: "http://vp-project.herokuapp.com/graphql"
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

let initialState = {
  isLogged: false,
  users: [],
  service: []
};

export const store = createStore(reducer, initialState);
