import { Product } from '../Product Model/product';
export interface iCart {
  belongsTo: string;
  products: Product[];
  id?: string;
}
