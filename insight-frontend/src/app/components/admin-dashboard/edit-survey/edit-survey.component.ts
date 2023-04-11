import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from 'src/app/services/form-data.service';
import { Question } from '../../../../../../insight-backend/app/models/question.js';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css'],
})
export class EditSurveyComponent {
  key: string;
  form: any;
  questions: [] = [];
  formName: string;
  description: string;

  constructor(
    private formService: FormDataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.key = params['key'];
      this.formService.getSurveyByKey(this.key);
      this.formService.formByKey.subscribe((form) => {
        this.form = form;
        this.questions = this.form.questions;
        this.formName = this.form.name;
        this.description = this.form.description;
        console.log(this.form);
      });
    });
  }

  editQuestion(ind: number, label: string) {
    setTimeout(() => {
      const question: Question = this.questions[ind];
      this.formService.editQuestionById(question._id, label);
    }, 2000);
  }

  onSubmitSurveyForm(surveyForm: any) {

    console.log('Survey Editted');
    this.toastr.success('Success', "Survey updated!");
    this.router.navigate(['/admin-dashboard'])
  }
}
