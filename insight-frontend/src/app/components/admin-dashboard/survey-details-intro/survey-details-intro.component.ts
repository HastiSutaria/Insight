import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-details-intro',
  templateUrl: './survey-details-intro.component.html',
  styleUrls: ['./survey-details-intro.component.css']
})
export class SurveyDetailsIntroComponent {
  
  constructor(private _router: Router, private activeRoute: ActivatedRoute) {}

  name: String = ''
  description: String = ''
  createForm() {
      this._router.navigate(['newSurvey'], {
        // relativeTo: this.activeRoute,
        queryParams: {
          name: this.name,
          description: this.description
        }
      })
  }

  onCancel() {
    this._router.navigate(['admin-dashboard']).then(() => {
      window.location.reload();
    });
  }
}
