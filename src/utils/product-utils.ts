import { Product } from "../types/product";

export function formatImportedProducts(productsData: Product[]) {
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
      };
    }
  });

  return Object.values(formattedProducts);
}

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}
