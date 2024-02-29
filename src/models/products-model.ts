import { Product } from "../types/product";

const PRODUCTS: Product[] = [];

export const getProducts = (): Product[] => PRODUCTS;

export const getProduct = (id: string): Product | undefined => {
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
