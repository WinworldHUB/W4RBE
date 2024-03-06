import { Member } from "./member";
import { Product } from "./product";
import { Packaging } from "./packagings";

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