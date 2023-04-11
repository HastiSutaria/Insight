import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  surveys;
  
  
  constructor(private formService: FormDataService, private router: Router) {}
  ngOnInit(): void {
    this.formService.getSurveys();
    this.formService.subject.subscribe((surveys) => {
      this.surveys = surveys;
    });
    // console.log(this.surveys);
  }

  getLink(ind: number) {
    return '/fillSurvey/' + this.surveys[ind].key + '/form'
  }

  
}
