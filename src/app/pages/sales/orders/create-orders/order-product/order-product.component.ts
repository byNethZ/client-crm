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
import { Observable, map, startWith } from 'rxjs';
import {
  OrderProductGeneral,
  OrderProductUniforms,
} from 'src/app/models/orders.interface';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
})
export class OrderProductComponent implements OnInit, OnChanges {
  public departaments: any[] = [];
  public selectedCategory: number | null = null;
  public formProductSubmitted: boolean = false;
  public products: Product[] = [];
  public productsByCat: Product[] = [];
  // public productsOrder: Array<OrderProductUniforms | OrderProductGeneral> = [];

  //mat autocomplete
  public controlProduct = new FormControl();
  public productSelected: Product | null = null;
  public filProducts: Observable<Product[]> = new Observable();

  @Input() token: string | null = null;
  @Input() productsOrder: Array<OrderProductUniforms | OrderProductGeneral>;

  @Output() productOrderedEmitter = new EventEmitter<
    OrderProductUniforms | OrderProductGeneral
  >();

  //product's filters
  public uniformsProducts: OrderProductUniforms[] = [];
  public generalProducts: OrderProductGeneral[] = [];

  public inputs = [
    { name: 'XS', value: 'size_xs' },
    { name: 'S', value: 'size_s' },
    { name: 'M', value: 'size_m' },
    { name: 'L', value: 'size_l' },
    { name: 'XL', value: 'size_xl' },
    { name: 'XXL', value: 'size_xxl' },
  ];

  public formUniforms: FormGroup;

  constructor(
    private _productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.formUniforms = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      color: ['', Validators.required],
      size_xs: [''],
      size_s: [''],
      size_m: [''],
      size_l: [''],
      size_xl: [''],
      size_xxl: [''],
      total_units: [{ value: '', disabled: true }, Validators.required],
      description: [''],
      unit_price: ['', Validators.required],
      subtotal: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    // this.productsOrder = this.productsInput;
    this.getDepartaments();
    this.filterProductsOrder();
    this.filteredOptions();
    console.log(this.productsOrder);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.productsInput) {
      // this.productsOrder = this.productsInput;
      console.log('changing');
      this.filterProductsOrder();
    }
  }

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

  addProduct() {
    // this.formProductSubmitted = true;
    console.log(this.formUniforms.invalid);
    if (this.formUniforms.invalid) {
      return;
    }
    this.formUniforms.enable();
    const product: OrderProductUniforms | OrderProductGeneral = {
      status: 1,
      product_id: this.productSelected!.id,
      sku: this.productSelected!.sku,
      name: this.productSelected!.name,
      product_category_id: this.productSelected!.category_id,
      description: this.formUniforms.value.description,
      subtotal: this.formUniforms.value.subtotal,
      type: this.formUniforms.value.type,
      color: this.formUniforms.value.color,
      size_xs: this.formUniforms.value.size_xs
        ? this.formUniforms.value.size_xs
        : 0,
      size_s: this.formUniforms.value.size_s
        ? this.formUniforms.value.size_s
        : 0,
      size_m: this.formUniforms.value.size_m
        ? this.formUniforms.value.size_m
        : 0,
      size_l: this.formUniforms.value.size_l
        ? this.formUniforms.value.size_l
        : 0,
      size_xl: this.formUniforms.value.size_xl
        ? this.formUniforms.value.size_xl
        : 0,
      size_xxl: this.formUniforms.value.size_xxl
        ? this.formUniforms.value.size_xxl
        : 0,
    };
    // console.log(product);
    this.productOrderedEmitter.emit(product);
    this.formProductSubmitted = true;
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

  filterProductsOrder() {
    this.productsOrder.map((product) => {
      if (product.product_category_id === 1) {
        this.uniformsProducts.push(product as OrderProductUniforms);
      } else {
        this.generalProducts.push(product as OrderProductGeneral);
      }
    });
  }

  filterProductsByCat(category: number) {
    this.productsByCat = this.products.filter(
      (product) => product.category_id === category
    );
  }

  //mat autocomplete
  displayFn(product: Product): string {
    return product ? product.name : '';
  }

  OnProductSelected(option: MatOption) {
    this.productSelected = option.value;
    this.setProductData();
  }

  setProductData() {
    console.log(this.productSelected);
    this.formUniforms.patchValue({
      name: this.productSelected?.name,
      // type: this.productSelected?.type,
    });
    this.setUnitPrice();
  }

  filteredOptions() {
    this.filProducts = this.controlProduct.valueChanges.pipe(
      startWith(''),
      map((val) => (typeof val === 'string' ? val : val.name)),
      map((value) => this._filterMatProducts(value))
    );
  }

  private _filterMatProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.productsByCat.filter((product) =>
      product.name?.toLowerCase().includes(filterValue)
    );
  }

  private setUnitPrice() {
    this.formUniforms.patchValue({
      unit_price: this.productSelected?.price_one,
    });
  }

  calculateTotal() {
    const totalUnits =
      this.formatInputQuantity(this.formUniforms.value.size_xs) +
      this.formatInputQuantity(this.formUniforms.value.size_s) +
      this.formatInputQuantity(this.formUniforms.value.size_m) +
      this.formatInputQuantity(this.formUniforms.value.size_l) +
      this.formatInputQuantity(this.formUniforms.value.size_xl) +
      this.formatInputQuantity(this.formUniforms.value.size_xxl);
    this.formUniforms.patchValue({
      total_units: totalUnits,
    });
    // console.log(this.formUniforms.value.total_units);
    this.calculateSubtotal(totalUnits);
  }

  private formatInputQuantity(
    value: string | undefined | null,
    result: 'int' | 'float' = 'int'
  ) {
    if (result === 'float') {
      return value ? parseFloat(value) : 0;
    }
    return value ? parseInt(value) : 0;
  }

  calculateSubtotal(totalUnits: number) {
    const subtotal =
      totalUnits *
      this.formatInputQuantity(this.formUniforms.value.unit_price, 'float');
    this.formUniforms.patchValue({
      subtotal: subtotal,
    });
    console.log(this.formUniforms.value.subtotal);
  }
}
