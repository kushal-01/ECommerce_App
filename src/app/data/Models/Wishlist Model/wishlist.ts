import { Product } from '../Product Model/product';
export interface iWishlist {
  belongsTo: string;
  products: Product[];
  id?: string;
}
