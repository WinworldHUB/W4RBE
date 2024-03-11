/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../awsApis";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createDeliveryDetail = /* GraphQL */ `mutation CreateDeliveryDetail(
  $input: CreateDeliveryDetailInput!
  $condition: ModelDeliveryDetailConditionInput
) {
  createDeliveryDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDeliveryDetailMutationVariables,
  APITypes.CreateDeliveryDetailMutation
>;
export const updateDeliveryDetail = /* GraphQL */ `mutation UpdateDeliveryDetail(
  $input: UpdateDeliveryDetailInput!
  $condition: ModelDeliveryDetailConditionInput
) {
  updateDeliveryDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDeliveryDetailMutationVariables,
  APITypes.UpdateDeliveryDetailMutation
>;
export const deleteDeliveryDetail = /* GraphQL */ `mutation DeleteDeliveryDetail(
  $input: DeleteDeliveryDetailInput!
  $condition: ModelDeliveryDetailConditionInput
) {
  deleteDeliveryDetail(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDeliveryDetailMutationVariables,
  APITypes.DeleteDeliveryDetailMutation
>;
export const createMember = /* GraphQL */ `mutation CreateMember(
  $input: CreateMemberInput!
  $condition: ModelMemberConditionInput
) {
  createMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMemberMutationVariables,
  APITypes.CreateMemberMutation
>;
export const updateMember = /* GraphQL */ `mutation UpdateMember(
  $input: UpdateMemberInput!
  $condition: ModelMemberConditionInput
) {
  updateMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMemberMutationVariables,
  APITypes.UpdateMemberMutation
>;
export const deleteMember = /* GraphQL */ `mutation DeleteMember(
  $input: DeleteMemberInput!
  $condition: ModelMemberConditionInput
) {
  deleteMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMemberMutationVariables,
  APITypes.DeleteMemberMutation
>;
