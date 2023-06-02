import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  OrderProduct,
  OrderProductGeneral,
  OrderProductUniforms,
} from 'src/app/models/orders.interface';
import { selectCollectionStateOrderProducts } from 'src/app/state/order/order-products/order-products.selector';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss'],
})
export class TableOrderComponent implements OnInit, OnChanges {
  //product's filters
  public uniformsProducts: OrderProductUniforms[] = [];
  public generalProducts: OrderProductGeneral[] = [];

  public productsOrder: Observable<readonly OrderProduct[]> = new Observable();

  constructor(private store: Store) {
    this.productsOrder = this.store.select(selectCollectionStateOrderProducts);
  }

  ngOnInit(): void {
    this.filterProductsOrder();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterProductsOrder();
  }

  filterProductsOrder() {
    this.productsOrder
      .pipe()
      .subscribe((arrayOrderProduct: readonly OrderProduct[]) => {
        arrayOrderProduct.map((product) => {
          if (product.product_category_id === 1) {
            this.uniformsProducts.push(product as OrderProductUniforms);
          } else {
            this.generalProducts.push(product as OrderProductGeneral);
          }
        });
      });
  }
}
