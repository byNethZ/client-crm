import { createActionGroup, props } from '@ngrx/store';
import { OrderProduct } from 'src/app/models/orders.interface';

export const OrderProductsActions = createActionGroup({
  source: 'OrderProducts',
  events: {
    'Add OrderProduct': props<{
      orderProduct: OrderProduct;
    }>(),
    'Remove OrderProduct': props<{ orderProduct: OrderProduct }>(),
  },
});

export const OrderProductsApiActions = createActionGroup({
  source: 'OrderProducts API',
  events: {
    'Retrieved OrderProducts List': props<{
      orderProducts: ReadonlyArray<OrderProduct>;
    }>(),
  },
});
