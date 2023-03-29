import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-details-intro',
  templateUrl: './survey-details-intro.component.html',
  styleUrls: ['./survey-details-intro.component.css']
})
export class SurveyDetailsIntroComponent {
  
  constructor(private _router: Router) {}

  name: String = ''
  description: String = ''
  createForm() {
      this._router.navigate(['/newSurvey'], {
        queryParams: {
          name: this.name,
          description: this.description
        }
      })
  }
}
