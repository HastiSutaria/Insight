import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  newForm: Boolean = false;
  surveys;
  createForm() {
    // console.log('called createForm ')
    this.newForm = true;
  }

  constructor(private formService: FormDataService, private toastr : ToastrService) {}
  ngOnInit(): void {
    this.formService.getSurveys();
    this.formService.subject.subscribe((surveys) => {
      this.surveys = surveys;
      console.log(this.surveys);
    });
  }

  getLink(ind: number) {
    return '/fillSurvey/' + this.surveys[ind].key + '/form';
  }
  
  getResponses(ind: number) {
    return '/surveyResponses/' + this.surveys[ind].key;
  }

  getAnalytics(ind: number) {
    return '/surveyAnalytics/' + this.surveys[ind].key;
  }

  editSurvey(ind: number) {
    return '/editSurvey/' + this.surveys[ind].key
  }
   
  deleteSurvey(ind: number) {
    this.formService
      .deleteSurvey(this.surveys[ind].key)
      .subscribe(() => {});
    
      this.surveys = this.surveys.filter((survey: { key: any; }) => survey.key !== this.surveys[ind].key);
      this.toastr.warning('Survey Deleted!')
  }
}
