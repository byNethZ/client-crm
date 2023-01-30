import { Component, OnInit } from '@angular/core';
import { Catalogue } from 'src/app/models/catalogue.interface';
import { CataloguesService } from 'src/app/services/catalogues.service';
import { UserService } from 'src/app/services/user.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent implements OnInit {

  public vendor_id : number | null;
  public catalogues: Catalogue[] = [];
  public token: string;

  constructor(
    private _userService: UserService,
    private _cataloguesService: CataloguesService,
  ) {
    this.vendor_id = null;
    this.token = '';
  }

  ngOnInit(): void {
    this.vendor_id = this._userService.getVendorID() ? this._userService.getVendorID() : 10;
    this.token = localStorage.getItem('token')!;
    this.getCatalogues();

  }

  getCatalogues(){
    this._cataloguesService.getCatalogues(this.token).subscribe(
      response => {
        this.catalogues = response;
      },
      error => {
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: `Error: ${error.message}`,
          showConfirmButton: false,
          showCloseButton: true
        });
      }
    )
  }

  saveClipboard(link: string){
    navigator.clipboard.writeText(link)

  }

  openUrl(url : string){
    window.open(url);
  }

}
