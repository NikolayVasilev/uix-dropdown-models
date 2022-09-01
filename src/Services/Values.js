import { gql, request } from "graphql-request";

const endpoint =
  "https://api-eu-central-1.hygraph.com/v2/cl3ybymx71ldt01z05s014kte/master";

const variables = {};
const headers = {};
const query = gql`
{
  positions {
    place
  }
}
`;

export const dropdownValues = await request(
  endpoint,
  query,
  variables,
  headers
);
