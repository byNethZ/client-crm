import { createReducer, on } from '@ngrx/store';
import { OrderProduct } from 'src/app/models/orders.interface';
import { OrderProductsActions } from './order-products.actions';

export const initialState: ReadonlyArray<OrderProduct> = [];

export const collectionReducer = createReducer(
  initialState,
  on(OrderProductsActions.removeOrderproduct, (state, { orderProduct }) =>
    state.filter((item) => item.id !== orderProduct.id)
  ),
  on(OrderProductsActions.addOrderproduct, (state, { orderProduct }) => {
    if (state.some((item) => item.id === orderProduct.id)) return state;

    return [...state, orderProduct];
  })
);
