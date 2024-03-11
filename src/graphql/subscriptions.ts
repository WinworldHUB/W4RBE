/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../awsApis";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateDeliveryDetail = /* GraphQL */ `subscription OnCreateDeliveryDetail(
  $filter: ModelSubscriptionDeliveryDetailFilterInput
) {
  onCreateDeliveryDetail(filter: $filter) {
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
    memberID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDeliveryDetailSubscriptionVariables,
  APITypes.OnCreateDeliveryDetailSubscription
>;
export const onUpdateDeliveryDetail = /* GraphQL */ `subscription OnUpdateDeliveryDetail(
  $filter: ModelSubscriptionDeliveryDetailFilterInput
) {
  onUpdateDeliveryDetail(filter: $filter) {
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
    memberID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDeliveryDetailSubscriptionVariables,
  APITypes.OnUpdateDeliveryDetailSubscription
>;
export const onDeleteDeliveryDetail = /* GraphQL */ `subscription OnDeleteDeliveryDetail(
  $filter: ModelSubscriptionDeliveryDetailFilterInput
) {
  onDeleteDeliveryDetail(filter: $filter) {
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
    memberID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDeliveryDetailSubscriptionVariables,
  APITypes.OnDeleteDeliveryDetailSubscription
>;
export const onCreateMember = /* GraphQL */ `subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
  onCreateMember(filter: $filter) {
    id
    name
    email
    phone
    active
    MemberDeliveryDetail {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMemberSubscriptionVariables,
  APITypes.OnCreateMemberSubscription
>;
export const onUpdateMember = /* GraphQL */ `subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
  onUpdateMember(filter: $filter) {
    id
    name
    email
    phone
    active
    MemberDeliveryDetail {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMemberSubscriptionVariables,
  APITypes.OnUpdateMemberSubscription
>;
export const onDeleteMember = /* GraphQL */ `subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
  onDeleteMember(filter: $filter) {
    id
    name
    email
    phone
    active
    MemberDeliveryDetail {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMemberSubscriptionVariables,
  APITypes.OnDeleteMemberSubscription
>;
export const onCreateProductVariant = /* GraphQL */ `subscription OnCreateProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onCreateProductVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductVariantSubscriptionVariables,
  APITypes.OnCreateProductVariantSubscription
>;
export const onUpdateProductVariant = /* GraphQL */ `subscription OnUpdateProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onUpdateProductVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductVariantSubscriptionVariables,
  APITypes.OnUpdateProductVariantSubscription
>;
export const onDeleteProductVariant = /* GraphQL */ `subscription OnDeleteProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onDeleteProductVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductVariantSubscriptionVariables,
  APITypes.OnDeleteProductVariantSubscription
>;
export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
