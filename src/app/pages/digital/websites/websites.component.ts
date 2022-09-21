import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vendor } from 'src/app/models/vendor.interface';
import { Website } from 'src/app/models/website.interface';
import { VendorService } from 'src/app/services/vendor.service';
import { WebsitesService } from 'src/app/services/websites.service';
import Utils from 'src/utils/Utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.scss']
})
export class WebsitesComponent implements OnInit {
  public title: string = 'Websites';
  public websites: Website[] = [];
  public token: string = localStorage.getItem('token')!;
  basicModalCloseResult: string = '';
  public form: FormGroup;
  public btnString: string;
  public vendors: Vendor[] = [];
  public isNew: boolean = false;
  public website: Website;
  public idWebsite: number = 0;
  public utils= new Utils;

  constructor(
    private _websitesService: WebsitesService,
    private _modalService: NgbModal,
    private _vendorService: VendorService
  ) {
    this.form = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      //customer_id: new FormControl(''),
      initial_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      service: new FormControl(''),
      payment: new FormControl(''),
      invoice: new FormControl(''),
      //invoice_id: new FormControl(''),
      payment_received: new FormControl(''),
      payment_method: new FormControl(''),
      vendor_id: new FormControl('', [Validators.required]),
      maintenance: new FormControl(''),
    });
    this.website = {
      id: 1,
      name: '',
      url: '',
      customer_id: 0,
      initial_date: '',
      end_date: '',
      service: '',
      payment: '',
      invoice: '',
      invoice_id: 1,
      payment_received: 1,
      payment_method: 1,
      vendor_id: 1,
      maintenance: 1,
    }
  }

  ngOnInit(): void {
    this.getWebsites();
    this.getVendors();
  }

  getWebsites(){
    this._websitesService.getWebsites(this.token).subscribe(
      response => {
        //console.log(response);
        this.websites = response
      },
      error => {
        console.log(error)
      }
    )

  }

  getVendors(){
    this._vendorService.getVendors(this.token).subscribe(
      response => {
        //console.log(response)
        this.vendors = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  setVendor(id: number|undefined) :  string | undefined {
    let vendor = this.vendors.find( vendor => vendor.id === id)
    return vendor?.name
  }

  openBasicModal(content: TemplateRef<any>, id?: number) {
    if(id){
      this.idWebsite = id;
      let websiteFound = this.websites.find( website => website.id === id)
      this.setForm(websiteFound);
      this.btnString = 'Editar';
      this.isNew = false;
    } else {
      this.btnString = 'Guardar'
      this.isNew = true;
    }

    this._modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  setForm(websiteValues: Website | undefined){
    console.log(websiteValues)
    if(websiteValues){
      this.form.setValue({
        name: websiteValues.name,
        url: websiteValues.url,
        //customer_id: websiteValues.customer_id,
        initial_date: websiteValues.initial_date,
        end_date: websiteValues.end_date,
        service: websiteValues.service,
        payment: websiteValues.payment,
        invoice: websiteValues.invoice,
        //invoice_id: websiteValues.invoice_id,
        payment_received: websiteValues.payment_received,
        payment_method: websiteValues.payment_method,
        vendor_id: websiteValues.vendor_id,
        maintenance: websiteValues.maintenance,
      })
    }

  }

  save(event: Event){
    event.preventDefault();

    //this.website.id = this.form.id;
    this.website.name = this.form.value.name;
    this.website.url = this.form.value.url;
    //this.website.customer_id = this.form.value.customer_id;
    this.website.initial_date = this.form.value.initial_date;
    this.website.end_date = this.form.value.end_date;
    this.website.service = this.form.value.service;
    this.website.payment = this.form.value.payment;
    this.website.invoice = this.form.value.invoice;
    //this.website.invoice_id = this.form.value.invoice_id;
    this.website.payment_received = this.form.value.payment_received;
    this.website.payment_method = this.form.value.payment_method;
    this.website.vendor_id = this.form.value.vendor_id;
    this.website.maintenance = this.form.value.maintenance ? 1 : 0;

    console.log(this.website)
    //return


    if(this.isNew){
      this._websitesService.createWebsite(this.token, this.website).subscribe(
        response => {
          console.log(response)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'El wesbite ha sido guardado',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })

          this.getWebsites();
          this.resetData();
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this._websitesService.updateWebsite(this.token, this.website, this.idWebsite).subscribe(
        response => {
          console.log(response)
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'El wesbite ha sido guardado',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })

          this.getWebsites();
          this.resetData();
        },
        error => {
          console.log(error)
        }
      )
    }

    this._modalService.dismissAll();
  }

  delete(id: number){
    Swal.fire({
      title: 'Confirmación',
      text: "Se eliminirá el registro del website ¿Continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Website',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._websitesService.deleteWebsite(this.token, id).subscribe(
          response => {
            this.getWebsites();
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'El website ha sido eliminado',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })

          },
          error => {
            console.log(error);

          }
        )
      }
    })
  }

  resetData(){
    this.website = {
      id: 1,
      name: '',
      url: '',
      customer_id: 1,
      initial_date: '',
      end_date: '',
      service: '',
      payment: '',
      invoice: '',
      invoice_id: 1,
      payment_received: 1,
      payment_method: 1,
      vendor_id: 1,
      maintenance: 1,
    }
    this.form.setValue({
      name: '',
      url: '',
      //customer_id: 0,
      initial_date: '',
      end_date: '',
      service: '',
      payment: '',
      invoice: '',
      //invoice_id: 0,
      payment_received: '',
      payment_method: '',
      vendor_id: 0,
      maintenance: '',
    })
  }

  checkDate(date: string) : string{
    let isoDate = this.utils.formatDate(date);
    let dateWebsite = new Date(isoDate);
    let dateNow = new Date();

    //console.log(dateWebsite)

    if(dateWebsite.getTime() < dateNow.getTime()){
      return 'text-danger';
    }

    return '';
  }

}
