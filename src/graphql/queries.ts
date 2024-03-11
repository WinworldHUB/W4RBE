/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../awsApis";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    body
    variants {
      size
      available
      quantity
      price
      __typename
    }
    quantity
    category
    price
    taxable
    published
    featuredImage
    otherImages
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
      quantity
      category
      price
      taxable
      published
      featuredImage
      otherImages
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
export const getDeliveryDetail =
  /* GraphQL */ `query GetDeliveryDetail($id: ID!) {
  getDeliveryDetail(id: $id) {
    id
    name
    phone
    email
    province
    city
    zip
    country
    price
    address1
    address2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetDeliveryDetailQueryVariables,
    APITypes.GetDeliveryDetailQuery
  >;
export const listDeliveryDetails = /* GraphQL */ `query ListDeliveryDetails(
  $filter: ModelDeliveryDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listDeliveryDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      phone
      email
      province
      city
      zip
      country
      price
      address1
      address2
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDeliveryDetailsQueryVariables,
  APITypes.ListDeliveryDetailsQuery
>;
export const getMember = /* GraphQL */ `query GetMember($id: ID!) {
  getMember(id: $id) {
    id
    name
    email
    phone
    active
    MemberDeliveryDetail {
      id
      name
      phone
      email
      province
      city
      zip
      country
      price
      address1
      address2
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    memberMemberDeliveryDetailId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMemberQueryVariables, APITypes.GetMemberQuery>;
export const listMembers = /* GraphQL */ `query ListMembers(
  $filter: ModelMemberFilterInput
  $limit: Int
  $nextToken: String
) {
  listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      phone
      active
      createdAt
      updatedAt
      memberMemberDeliveryDetailId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMembersQueryVariables,
  APITypes.ListMembersQuery
>;
