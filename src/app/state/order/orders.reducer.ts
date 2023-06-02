import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/models/orders.interface';
import { OrdersApiActions } from './orders.actions';

export const initialState: ReadonlyArray<Order> = [];

export const ordersReducer = createReducer(
  initialState,
  on(OrdersApiActions.retrievedOrderList, (_state, { orders }) => orders)
);
