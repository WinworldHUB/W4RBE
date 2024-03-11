/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  id?: string | null,
  title?: string | null,
  body?: string | null,
  variants?: Array< VariantInput | null > | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: string | null,
};

export type VariantInput = {
  size?: string | null,
  available?: boolean | null,
  quantity?: number | null,
  price?: number | null,
};

export type ModelProductConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  category?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  taxable?: ModelBooleanInput | null,
  published?: ModelBooleanInput | null,
  featuredImage?: ModelStringInput | null,
  otherImages?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  title?: string | null,
  body?: string | null,
  variants?:  Array<Variant | null > | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Variant = {
  __typename: "Variant",
  size?: string | null,
  available?: boolean | null,
  quantity?: number | null,
  price?: number | null,
};

export type UpdateProductInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  variants?: Array< VariantInput | null > | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateDeliveryDetailInput = {
  id?: string | null,
  name: string,
  phone: string,
  email: string,
  province?: string | null,
  city?: string | null,
  zip: string,
  country?: string | null,
  price?: string | null,
  address1?: string | null,
  address2?: string | null,
};

export type ModelDeliveryDetailConditionInput = {
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  province?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  price?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  and?: Array< ModelDeliveryDetailConditionInput | null > | null,
  or?: Array< ModelDeliveryDetailConditionInput | null > | null,
  not?: ModelDeliveryDetailConditionInput | null,
};

export type DeliveryDetail = {
  __typename: "DeliveryDetail",
  id: string,
  name: string,
  phone: string,
  email: string,
  province?: string | null,
  city?: string | null,
  zip: string,
  country?: string | null,
  price?: string | null,
  address1?: string | null,
  address2?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateDeliveryDetailInput = {
  id: string,
  name?: string | null,
  phone?: string | null,
  email?: string | null,
  province?: string | null,
  city?: string | null,
  zip?: string | null,
  country?: string | null,
  price?: string | null,
  address1?: string | null,
  address2?: string | null,
};

export type DeleteDeliveryDetailInput = {
  id: string,
};

export type CreateMemberInput = {
  id?: string | null,
  name: string,
  email: string,
  phone?: string | null,
  active: boolean,
  memberMemberDeliveryDetailId?: string | null,
};

export type ModelMemberConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelMemberConditionInput | null > | null,
  or?: Array< ModelMemberConditionInput | null > | null,
  not?: ModelMemberConditionInput | null,
  memberMemberDeliveryDetailId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Member = {
  __typename: "Member",
  id: string,
  name: string,
  email: string,
  phone?: string | null,
  active: boolean,
  MemberDeliveryDetail?: DeliveryDetail | null,
  createdAt: string,
  updatedAt: string,
  memberMemberDeliveryDetailId?: string | null,
};

export type UpdateMemberInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  active?: boolean | null,
  memberMemberDeliveryDetailId?: string | null,
};

export type DeleteMemberInput = {
  id: string,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  category?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  taxable?: ModelBooleanInput | null,
  published?: ModelBooleanInput | null,
  featuredImage?: ModelStringInput | null,
  otherImages?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelDeliveryDetailFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  province?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  price?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  and?: Array< ModelDeliveryDetailFilterInput | null > | null,
  or?: Array< ModelDeliveryDetailFilterInput | null > | null,
  not?: ModelDeliveryDetailFilterInput | null,
};

export type ModelDeliveryDetailConnection = {
  __typename: "ModelDeliveryDetailConnection",
  items:  Array<DeliveryDetail | null >,
  nextToken?: string | null,
};

export type ModelMemberFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelMemberFilterInput | null > | null,
  or?: Array< ModelMemberFilterInput | null > | null,
  not?: ModelMemberFilterInput | null,
  memberMemberDeliveryDetailId?: ModelIDInput | null,
};

export type ModelMemberConnection = {
  __typename: "ModelMemberConnection",
  items:  Array<Member | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  body?: ModelSubscriptionStringInput | null,
  quantity?: ModelSubscriptionIntInput | null,
  category?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  taxable?: ModelSubscriptionBooleanInput | null,
  published?: ModelSubscriptionBooleanInput | null,
  featuredImage?: ModelSubscriptionStringInput | null,
  otherImages?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionDeliveryDetailFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  province?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  zip?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionStringInput | null,
  address1?: ModelSubscriptionStringInput | null,
  address2?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDeliveryDetailFilterInput | null > | null,
  or?: Array< ModelSubscriptionDeliveryDetailFilterInput | null > | null,
};

export type ModelSubscriptionMemberFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  active?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionMemberFilterInput | null > | null,
  or?: Array< ModelSubscriptionMemberFilterInput | null > | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDeliveryDetailMutationVariables = {
  input: CreateDeliveryDetailInput,
  condition?: ModelDeliveryDetailConditionInput | null,
};

export type CreateDeliveryDetailMutation = {
  createDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeliveryDetailMutationVariables = {
  input: UpdateDeliveryDetailInput,
  condition?: ModelDeliveryDetailConditionInput | null,
};

export type UpdateDeliveryDetailMutation = {
  updateDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeliveryDetailMutationVariables = {
  input: DeleteDeliveryDetailInput,
  condition?: ModelDeliveryDetailConditionInput | null,
};

export type DeleteDeliveryDetailMutation = {
  deleteDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMemberMutationVariables = {
  input: CreateMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type CreateMemberMutation = {
  createMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type UpdateMemberMutationVariables = {
  input: UpdateMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type UpdateMemberMutation = {
  updateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type DeleteMemberMutationVariables = {
  input: DeleteMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type DeleteMemberMutation = {
  deleteMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title?: string | null,
      body?: string | null,
      quantity?: number | null,
      category?: string | null,
      price?: number | null,
      taxable?: boolean | null,
      published?: boolean | null,
      featuredImage?: string | null,
      otherImages?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDeliveryDetailQueryVariables = {
  id: string,
};

export type GetDeliveryDetailQuery = {
  getDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDeliveryDetailsQueryVariables = {
  filter?: ModelDeliveryDetailFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeliveryDetailsQuery = {
  listDeliveryDetails?:  {
    __typename: "ModelDeliveryDetailConnection",
    items:  Array< {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMemberQueryVariables = {
  id: string,
};

export type GetMemberQuery = {
  getMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type ListMembersQueryVariables = {
  filter?: ModelMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMembersQuery = {
  listMembers?:  {
    __typename: "ModelMemberConnection",
    items:  Array< {
      __typename: "Member",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      active: boolean,
      createdAt: string,
      updatedAt: string,
      memberMemberDeliveryDetailId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?:  Array< {
      __typename: "Variant",
      size?: string | null,
      available?: boolean | null,
      quantity?: number | null,
      price?: number | null,
    } | null > | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDeliveryDetailSubscriptionVariables = {
  filter?: ModelSubscriptionDeliveryDetailFilterInput | null,
};

export type OnCreateDeliveryDetailSubscription = {
  onCreateDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDeliveryDetailSubscriptionVariables = {
  filter?: ModelSubscriptionDeliveryDetailFilterInput | null,
};

export type OnUpdateDeliveryDetailSubscription = {
  onUpdateDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDeliveryDetailSubscriptionVariables = {
  filter?: ModelSubscriptionDeliveryDetailFilterInput | null,
};

export type OnDeleteDeliveryDetailSubscription = {
  onDeleteDeliveryDetail?:  {
    __typename: "DeliveryDetail",
    id: string,
    name: string,
    phone: string,
    email: string,
    province?: string | null,
    city?: string | null,
    zip: string,
    country?: string | null,
    price?: string | null,
    address1?: string | null,
    address2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnCreateMemberSubscription = {
  onCreateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type OnUpdateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnUpdateMemberSubscription = {
  onUpdateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};

export type OnDeleteMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnDeleteMemberSubscription = {
  onDeleteMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    MemberDeliveryDetail?:  {
      __typename: "DeliveryDetail",
      id: string,
      name: string,
      phone: string,
      email: string,
      province?: string | null,
      city?: string | null,
      zip: string,
      country?: string | null,
      price?: string | null,
      address1?: string | null,
      address2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    memberMemberDeliveryDetailId?: string | null,
  } | null,
};
