export type OrderProduct =
  | (OrderProductMain & OrderProductUniforms)
  | (OrderProductMain & OrderProductGeneral);
export interface OrderShow {
  id: number;
  status: number;
  user_id: number;
  customer_id: number;
  subtotal: number;
}
export interface Order extends OrderShow {
  shipping_address: string;
  shipping_state_id: number;
  shipping_zipcode: string;
  alternative_phone: null | string;
  address_on_product: null | string;
  discount: number;
  taxes: number;
  observations: null | string;
  projects: Array<OrderProductUniforms | OrderProductGeneral>;
}

export interface OrderProductMain {
  id: number;
  status: number;
  product_id: number;
  sku: string;
  name: string;
  product_category_id: number;
  description: null | string;
  subtotal: number;
}

export interface OrderProductUniforms extends OrderProductMain {
  type: number;
  size_xs: number;
  size_s: number;
  size_m: number;
  size_l: number;
  size_xl: number;
  size_xxl: number;
  color: string;
}

export interface OrderProductGeneral extends OrderProductMain {
  qty: number;
}
