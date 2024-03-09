/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../awsApis";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProductVariant = /* GraphQL */ `query GetProductVariant($id: ID!) {
  getProductVariant(id: $id) {
    id
    size
    price
    available
    quantity
    productID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProductVariantQueryVariables,
  APITypes.GetProductVariantQuery
>;
export const listProductVariants = /* GraphQL */ `query ListProductVariants(
  $filter: ModelProductVariantFilterInput
  $limit: Int
  $nextToken: String
) {
  listProductVariants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      size
      price
      available
      quantity
      productID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductVariantsQueryVariables,
  APITypes.ListProductVariantsQuery
>;
export const productVariantsByProductID = /* GraphQL */ `query ProductVariantsByProductID(
  $productID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductVariantFilterInput
  $limit: Int
  $nextToken: String
) {
  productVariantsByProductID(
    productID: $productID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      size
      price
      available
      quantity
      productID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProductVariantsByProductIDQueryVariables,
  APITypes.ProductVariantsByProductIDQuery
>;
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    body
    category
    size
    quantity
    price
    taxable
    featuredImage
    otherImages
    published
    ProductVariants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      body
      category
      size
      quantity
      price
      taxable
      featuredImage
      otherImages
      published
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
