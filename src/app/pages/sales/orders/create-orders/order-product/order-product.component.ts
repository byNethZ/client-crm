import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import {
  OrderProductGeneral,
  OrderProductUniforms,
} from 'src/app/models/orders.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { OrderProductsActions } from 'src/app/state/order/order-products/order-products.actions';
import { selectOrderProducts } from 'src/app/state/order/order-products/order-products.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
})
export class OrderProductComponent implements OnInit {
  public departaments: any[] = [];
  public selectedCategory: number | null = null;
  public formProductSubmitted: boolean = false;
  public products: Product[] = [];
  public productsByCat: Product[] = [];
  // public productsOrder: Array<OrderProductUniforms | OrderProductGeneral> = [];

  @Input() token: string | null = null;
  // @Input() productsOrder: Array<OrderProductUniforms | OrderProductGeneral>;

  // @Output() productOrderedEmitter = new EventEmitter<
  //   OrderProductUniforms | OrderProductGeneral
  // >();

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    // this.productsOrder = this.productsInput;
    this.getDepartaments();
    // this.filterProductsOrder();

    // console.log(this.productsOrder);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   if (changes.productsInput) {
  //     // this.productsOrder = this.productsInput;
  //     console.log('changing');
  //     this.filterProductsOrder();
  //   }
  // }

  getDepartaments() {
    this._productService.getProductCategories(this.token!).subscribe(
      (response) => {
        this.departaments = response;
        // console.log(response);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts(this.token!).subscribe(
      (response) => {
        this.products = response;
        // console.log(response);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    );
  }

  onCheckChange(event: any) {
    this.selectedCategory = parseInt(event.target.value);
    this.filterProductsByCat(this.selectedCategory);
    // console.log(this.productsByCat);
  }

  deleteProduct() {}

  clearSelectedProduct() {
    this.selectedCategory = null;
  }

  clearData() {
    this.clearSelectedProduct();
    this.formProductSubmitted = false;
    console.log(this.selectedCategory, this.formProductSubmitted);
  }

  filterProductsByCat(category: number) {
    this.productsByCat = this.products.filter(
      (product) => product.category_id === category
    );
  }
}
