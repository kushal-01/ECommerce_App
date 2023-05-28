import { Product } from '../Product Model/product';
export interface iOrder {
  belongsTo: string;
  products: Product[];
  id?: string;
}
