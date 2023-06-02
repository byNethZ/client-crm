import { createActionGroup, props } from '@ngrx/store';
import { Order } from 'src/app/models/orders.interface';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    'Add Order': props<{ order: Order }>(),
    // 'Remove Order': props<{ order: Order }>(),
  },
});

export const OrdersApiActions = createActionGroup({
  source: 'Orders API',
  events: {
    'Retrieved Order List': props<{ orders: ReadonlyArray<Order> }>(),
  },
});
