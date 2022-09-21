import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-dashboard',
  templateUrl: './buttons-dashboard.component.html',
  styleUrls: ['./buttons-dashboard.component.scss']
})
export class ButtonsDashboardComponent implements OnInit {
  public departament_id: number = parseInt(localStorage.getItem('departament_id')!);
  public departament_alt_id: number | null = parseInt(localStorage.getItem('departament_alt_id')!);
  public role_id: number = parseInt(localStorage.getItem('role_id')!);

  constructor() { }

  ngOnInit(): void {
  }

}
