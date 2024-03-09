import { Product } from "../types/product";
import { generateClient } from "aws-amplify/api";
import { listProducts, getProduct } from "../graphql/queries";
import { forEach } from "lodash";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../graphql/mutations";
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

export const getProductByID = async (id: string) => {
  try {
    const foundProduct = await awsClient.graphql({
      query: getProduct,
      variables: {
        id: id,
      },
    });
    return foundProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const insertProduct = async (product: Product): Promise<Product> => {
  await awsClient.graphql({
    query: createProduct,
    variables: {
      input: {
        body: product.body,
        category: product.category,
        featuredImage: product.featuredImage,
        price: product.price,
        published: product.published,
        quantity: product.quantity,
        size: product.size,
        taxable: product.taxable,
        title: product.title,
      },
    },
  });
  return product;
};

export const updateProductModel = async (
  product: Product
): Promise<Product> => {
  await awsClient.graphql({
    query: updateProduct,
    variables: {
      input: {
        id: product.id,
        otherImages: product.otherImages
      },
    },
  });
  return product;
};

export const deleteProductModel = async (id: string) => {
  await awsClient.graphql({
    query: deleteProduct,
    variables: {
      input: {
        id: id,
      },
    },
  });
};
