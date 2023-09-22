import { Component, OnInit } from '@angular/core';
import { Assist } from 'src/app/models/assist.interface';
import { AssistService } from 'src/app/services/assist.service';

@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.scss'],
})
export class AssistsComponent implements OnInit {
  public assists: Assist[] = [];
  public event: string = 'chattlatino';

  constructor(private _assistService: AssistService) {}

  ngOnInit(): void {
    this.getAssists();
  }

  getAssists() {
    this._assistService.getAssists(this.event).subscribe({
      next: (result) => {
        console.log(result);
        this.assists = result;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setAssist(state: string): string {
    switch (state) {
      case 'yes':
        return 'Personas que asistirán';
        break;
      case 'no':
        return 'Personas que no asistirán';
        break;
      case 'maybe':
        return 'Personas que tal vez asistirán';
        break;

      default:
        return 'Si';
        break;
    }
  }
}
