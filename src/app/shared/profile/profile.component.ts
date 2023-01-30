import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() avatar: string;
  @Input() name: string;
  @Input() role_id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
