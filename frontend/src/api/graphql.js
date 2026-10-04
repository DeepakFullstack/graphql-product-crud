import axios from "axios";

const graphqlClient = axios.create({
  baseURL: import.meta.env.VITE_GRAPHQL_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function getProducts() {
  const query = `
        query {
            products {
                id
                name
                price
                description
            }
        }
    `;

  const response = await graphqlClient.post("", {
    query,
  });

  return response.data;
}

export async function getProduct(id) {
  const query = `
        query GetProduct($id: ID!) {
            product(id: $id) {
                id
                name
                price
                description
            }
        }
    `;

  const response = await graphqlClient.post("", {
    query,
    variables: {
      id,
    },
  });

  return response.data;
}

export async function createProduct(product) {
  const query = `
        mutation CreateProduct(
            $name: String!
            $price: Float!
            $description: String
        ) {
            createProduct(
                name: $name
                price: $price
                description: $description
            ) {
                id
                name
                price
                description
            }
        }
    `;

  const response = await graphqlClient.post("", {
    query,
    variables: product,
  });

  return response.data;
}

export async function updateProduct(product) {
  const query = `
        mutation UpdateProduct(
            $id: ID!
            $name: String!
            $price: Float!
            $description: String
        ) {
            updateProduct(
                id: $id
                name: $name
                price: $price
                description: $description
            ) {
                id
                name
                price
                description
            }
        }
    `;

  const response = await graphqlClient.post("", {
    query,
    variables: product,
  });

  return response.data;
}
