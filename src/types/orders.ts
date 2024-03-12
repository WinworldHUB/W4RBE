import { Product } from "../awsApis";
import { Member } from "./member";
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
