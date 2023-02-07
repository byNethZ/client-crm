import { Component, Input, OnInit } from '@angular/core';
import Utils from 'src/utils/Utils';

@Component({
  selector: 'card-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public utils = new Utils();
  @Input() avatar: string;
  @Input() name: string;
  @Input() role_id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
