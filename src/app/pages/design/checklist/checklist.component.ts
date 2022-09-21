import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  public createLink : boolean = false;


  constructor(

  ) { }

  ngOnInit(): void {

  }





  showCreateContainer(){
    this.createLink = !this.createLink;
  }



}
