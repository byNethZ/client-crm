import { ActionReducerMap } from '@ngrx/store';
import { Order, OrderProduct } from '../models/orders.interface';
import { ordersReducer } from './order/orders.reducer';
import { ordersProductsReducer } from './order/order-products/order-products.reducer';
import { collectionReducer } from './order/order-products/collection.reducer';

export interface AppState {
  orders: ReadonlyArray<Order>;
  orderProducts: ReadonlyArray<OrderProduct>;
  collectionOrderProducts: ReadonlyArray<OrderProduct>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  orders: ordersReducer,
  orderProducts: ordersProductsReducer,
  collectionOrderProducts: collectionReducer,
};
