import { createReducer, on } from '@ngrx/store';
import { OrderProduct } from 'src/app/models/orders.interface';
import { OrderProductsApiActions } from './order-products.actions';

export const initialState: ReadonlyArray<OrderProduct> = [];

export const ordersProductsReducer = createReducer(
  initialState,
  on(
    OrderProductsApiActions.retrievedOrderproductsList,
    (_state, { orderProducts }) => orderProducts
  )
);
