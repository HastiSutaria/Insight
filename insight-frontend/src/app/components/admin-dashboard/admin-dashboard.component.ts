import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  newForm: Boolean = false
  surveys;
  createForm() {
    // console.log('called createForm ')
    this.newForm = true
  }
  
  constructor(private formService: FormDataService) {}
  ngOnInit(): void {
    this.formService.getSurveys();
    this.formService.subject.subscribe((surveys) => {
      this.surveys = surveys;
      // console.log(this.surveys);
    });
  }

  getLink(ind: number) {
    return '/fillSurvey/' + this.surveys[ind].key + '/form'
  }
}
