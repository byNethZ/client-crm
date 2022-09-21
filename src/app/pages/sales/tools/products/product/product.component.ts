import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public idProduct: string |null = null;
  public token: string = localStorage.getItem('token')!;
  public product: Product;
  public category: string;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {

  }


  ngOnInit(): void {
    this.getProductData();

  }

  getProductData() {
    this.idProduct = this._route.snapshot.paramMap.get('id');
    if(this.idProduct){
      this._productService.getProduct(this.token, parseInt(this.idProduct)).subscribe(
        result => {
          this.product = result.product;
          this.category = result.category;

        },
        error => {
          console.log(error);

        }
      )
    }

  }
}
