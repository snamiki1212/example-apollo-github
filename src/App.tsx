import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  {
    organization(login: "apollographql") {
      repositories(first: 5, isFork: false) {
        nodes {
          id
          name
          url
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const App: React.FC = () => {
  return (
    <Query query={query}>
      {({ loading, data, error }: any) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.toString()}</p>;

        const repositories = data.organization.repositories.nodes;

        return (
          <ul>
            {repositories.map((repo:any) => (
              <li key={repo.id}>
                <a href={repo.url}>{repo.name}</a>
                <button>{repo.stargazers.totalCount} Star</button>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default App;
