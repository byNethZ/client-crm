import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-restringed',
  templateUrl: './layout-restringed.component.html',
  styleUrls: ['./layout-restringed.component.scss'],
})
export class LayoutRestringedComponent implements OnInit {
  public role_id: number = localStorage.getItem('role_id')
    ? parseInt(localStorage.getItem('role_id')!)
    : 0;

  constructor() {}

  ngOnInit(): void {}
}
