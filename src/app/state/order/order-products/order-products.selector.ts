import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderProduct } from 'src/app/models/orders.interface';

export const selectOrderProducts =
  createFeatureSelector<ReadonlyArray<OrderProduct>>('orderProducts');

export const selectCollectionStateOrderProducts = createFeatureSelector<
  ReadonlyArray<OrderProduct>
>('collectionOrderProducts');

// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id)!);
//   }
// );
