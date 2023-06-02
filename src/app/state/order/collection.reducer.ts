import { createReducer, on } from '@ngrx/store';
import { OrdersActions } from './orders.actions';
import { Order } from 'src/app/models/orders.interface';

export const initialState: ReadonlyArray<Order> = [];

export const collectionReducer = createReducer(
  initialState,
  // on(OrdersActions., (state, { order }) =>
  //   state.filter((id) => id !== orderId)
  // ),
  on(OrdersActions.addOrder, (state, { order }) => {
    if (state.some((item) => item.id === order.id)) return state;

    return [...state, order];
  })
);
