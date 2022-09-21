import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public productsFiltered: Product[] = [];
  public token: string = localStorage.getItem('token')!;
  public filterValue: string;

  constructor(
    private _productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts(this.token).subscribe(
      response => {
        this.products = response;
        this.productsFiltered = this.products;

      },
      error => {
        console.log(error);
      }
      )

    }

    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      //console.log(this.filterValue);
      let filterValueLower = this.filterValue.toLowerCase();
      if(this.filterValue === '' ) {
          this.productsFiltered = this.products;
      }
      else {
        this.productsFiltered = this.products.filter((product) => product.sku.toLowerCase().includes(filterValueLower,-1))
      }

    }
}
