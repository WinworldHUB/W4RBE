export type Product = {
    id: string;
    title: string;
    body: string;
    category: string;
    published: boolean;
    size: string;
    variants: {
      size: string;
      available: boolean;
      price: number;
      quantity: number;
    }[];
    quantity: number;
    price: number;
    taxable: boolean;
    featuredImage: string;
    otherImages: string[];
  };