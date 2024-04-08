import { forEach } from "lodash";
import { GraphQLResult } from "aws-amplify/api";
import { CreateProductInput, Product, UpdateProductInput } from "../awsApis";

export const dbToProduct = (dbProduct: unknown): Product => {
  return {
    id: dbProduct["id"],
    body: dbProduct["body"],
    category: dbProduct["category"],
    published: dbProduct["published"],
    title: dbProduct["title"],
    variants:
      dbProduct["variants"] !== null ? JSON.parse(dbProduct["variants"]) : [],
    price: dbProduct["price"],
    taxable: dbProduct["taxable"],
    featuredImage: dbProduct["featuredImage"],
    otherImages: dbProduct["otherImages"],
    size: dbProduct["size"],
    quantity: dbProduct["quantity"],
    brand: dbProduct["brand"],
    tag: dbProduct["tag"],
  } as Product;
};

export const dbToProducts = (allProducts: unknown[]): Product[] => {
  const products: Product[] = [];

  forEach(allProducts, (product) => {
    products.push(dbToProduct(product));
  });

  return products;
};

export const productToDB = (product: Product): CreateProductInput => {
  return {
    body: product.body,
    category: product.category,
    published: product.published,
    title: product.title,
    variants: JSON.stringify(product.variants),
    price: product.price,
    taxable: product.taxable,
    featuredImage: product.featuredImage,
    otherImages: product.otherImages,
    size: product.size,
    quantity: product.quantity,
    brand: product.brand,
    tag: product.tag,
  };
};

export const productToDBForUpdate = (product: Product): UpdateProductInput => {
  return {
    id: product.id,
    body: product.body,
    category: product.category,
    published: product.published,
    title: product.title,
    variants: JSON.stringify(product.variants),
    price: product.price,
    taxable: product.taxable,
    featuredImage: product.featuredImage,
    otherImages: product.otherImages,
    size: product.size,
    quantity: product.quantity,
    tag: product.tag,
    brand: product.brand,
  };
};

export const formatImportedProducts = (productsData: Product[]) => {
  const formattedProducts = {};

  const processedProductIds = new Set();

  productsData.forEach((product: Product) => {
    const id = product["Handle"];
    processedProductIds.add(id);

    const title = product["Title"];
    const bodyHtml = product["Body (HTML)"];

    if (bodyHtml === undefined) {
      return;
    }

    let category: string;
    if (id.toLowerCase().includes("bulk")) {
      category = "Bulk";
    } else {
      category = product["Product Category"];
    }
    const published = product["Published"];
    const price = product["Variant Price"];
    const taxable = product["Variant Taxable"];
    const featuredImage = product["Image Src"];
    const otherImages = product["Image Alt Text"];
    const size = product["Option1 Value"];
    const variantPrice = product["Variant Price"];
    const variantQuantity = product["Variant Inventory Qty"];
    const bodyText = stripHtml(bodyHtml);
    const brand = product["Vendor"]
    const tag = product["Tags"]

    if (formattedProducts[id]) {
      formattedProducts[id].variants.push({
        size: size,
        available: true,
        price: variantPrice,
        quantity: variantQuantity,
      });
    } else {
      formattedProducts[id] = {
        id: id,
        title: title,
        body: bodyText,
        category: category,
        published: published,
        size: size,
        variants: [
          {
            size: size,
            available: true,
            price: variantPrice,
            quantity: variantQuantity,
          },
        ],
        price: price,
        taxable: taxable,
        featuredImage: featuredImage,
        otherImages: otherImages,
        brand: brand,
        tag: tag,
      };
    }
  });

  return Object.values(formattedProducts);
};

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}
