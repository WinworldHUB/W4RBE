import { Member } from "./member";
import { Product } from "./product";


export type Order = {
  id: string;
  orderValue: number;
  status: string;
  orderDate: string;
  paymentDate?: string;
  products?: Product[];
  member?: Member;
  packaging?: Packaging;
};

export type Packaging = {
  id: string;
  title: string;
  description: string;
  minQuantity: number;
  maxQuantity: number;
  available: boolean;
};
