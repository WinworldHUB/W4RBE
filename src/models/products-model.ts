import { Product } from "../types/product";
import { generateClient } from "aws-amplify/api";
import { listProducts } from "../graphql/queries";
import { forEach } from "lodash";

const awsClient = generateClient();

const PRODUCTS: Product[] = [];

export const getPagedProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];

  const result = await awsClient.graphql({
    query: listProducts,
  });

  if (result.data) {
    forEach(result.data.listProducts.items, (product) =>
      products.push({
        id: product.id,
        body: product.body,
        category: product.category,
        featuredImage: product.featuredImage,
        price: product.price,
        published: product.published,
        quantity: product.quantity,
        size: product.size,
        taxable: product.taxable,
        title: product.title,
      } as Product)
    );
  }

  return products;
};

export const getProduct1 = (id: string): Product | undefined => {
  return PRODUCTS.find((p) => p.id === id);
};

export const insertProduct = (product: Product): Product => {
  PRODUCTS.push(product);
  return product;
};

export const updateProduct = (product: Product): Product | undefined => {
  const index = PRODUCTS.findIndex((p) => p.id === product.id);

  if (index < 0) {
    return undefined;
  }

  PRODUCTS[index] = product;

  return product;
};

export const deleteProduct = (id: string): Product | undefined => {
  const index = PRODUCTS.findIndex((p) => p.id === id);

  if (index < 0) {
    return undefined;
  }

  return PRODUCTS.splice(index, 1)[0];
};
