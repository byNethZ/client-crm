import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Order } from 'src/app/models/orders.interface';

export const selectBooks =
  createFeatureSelector<ReadonlyArray<Order>>('orders');

// export const selectCollectionState = createFeatureSelector<
//   ReadonlyArray<string>
// >('collection');

// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id)!);
//   }
// );
