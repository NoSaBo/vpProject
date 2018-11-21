import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { reducer } from "./reducer";

const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql"
  uri: "http://vp-project.herokuapp.com/graphql"
});

const defaults = {
  userName: "",
  firstName: "",
  lastName: "",
  // currentUser: {
  //   __typename: "CurrentUser",
  //   isLogged: false,
  //   id: "",
  //   userName: "",
  //   firstName: "",
  //   lastName: ""
  // },
  branch: "",
  begin: "",
  end: ""
};

const resolvers = {
  Mutation: {
    setUser: (_, args, { cache }) => {
      const { userName, firstName, lastName } = args;
      cache.writeData({
        data: {
          currentUser: {
            userName,
            firstName,
            lastName,
            isLogged: true,
            __typename: "CurrentUser"
          }
        }
      });
      return null;
    }
  }
};

const cache = new InMemoryCache();

const stateLink = withClientState({
  resolvers,
  cache,
  defaults
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink])
  // link: stateLink.concat(httpLink)
});

const logout = client.onResetStore(stateLink.writeDefaults);
