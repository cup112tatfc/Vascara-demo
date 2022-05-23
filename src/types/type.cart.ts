export type ProductOfCart = {
  id: number | string;
  name: string;
  color: string;
  size: string;
  total: number;
  price: number;
  priceOff: number;
};
export type Cart = {
  id: string;
  categoryId: string;
  cart: ProductOfCart[];
};
