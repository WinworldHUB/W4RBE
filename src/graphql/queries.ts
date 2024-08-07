/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../awsApis";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getOrderCounter = /* GraphQL */ `query GetOrderCounter($id: ID!) {
  getOrderCounter(id: $id) {
    id
    orders
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetOrderCounterQueryVariables,
  APITypes.GetOrderCounterQuery
>;
export const listOrderCounters = /* GraphQL */ `query ListOrderCounters(
  $filter: ModelOrderCounterFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrderCounters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      orders
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrderCountersQueryVariables,
  APITypes.ListOrderCountersQuery
>;
export const getInvoice = /* GraphQL */ `query GetInvoice($id: ID!) {
  getInvoice(id: $id) {
    id
    orderId
    invoiceDate
    paymentDate
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetInvoiceQueryVariables,
  APITypes.GetInvoiceQuery
>;
export const listInvoices = /* GraphQL */ `query ListInvoices(
  $filter: ModelInvoiceFilterInput
  $limit: Int
  $nextToken: String
) {
  listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      orderId
      invoiceDate
      paymentDate
      memberId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInvoicesQueryVariables,
  APITypes.ListInvoicesQuery
>;
export const getOrder = /* GraphQL */ `query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    orderNumber
    orderDate
    orderValue
    products
    deliveryDetails
    status
    trackingStatus
    trackingNumber
    packagingType
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetOrderQueryVariables, APITypes.GetOrderQuery>;
export const listOrders = /* GraphQL */ `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      orderNumber
      orderDate
      orderValue
      products
      deliveryDetails
      status
      trackingStatus
      trackingNumber
      packagingType
      memberId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrdersQueryVariables,
  APITypes.ListOrdersQuery
>;
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    body
    variants
    quantity
    category
    price
    taxable
    published
    featuredImage
    otherImages
    size
    available
    tag
    brand
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
      variants
      quantity
      category
      price
      taxable
      published
      featuredImage
      otherImages
      size
      available
      tag
      brand
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
export const getMember = /* GraphQL */ `query GetMember($id: ID!) {
  getMember(id: $id) {
    id
    name
    email
    phone
    active
    province
    city
    zip
    country
    address1
    address2
    deliveryPerson
    deliveryEmail
    deliveryAddress1
    deliveryAddress2
    createdAt
    updatedAt
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
      province
      city
      zip
      country
      address1
      address2
      deliveryPerson
      deliveryEmail
      deliveryAddress1
      deliveryAddress2
      createdAt
      updatedAt
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
