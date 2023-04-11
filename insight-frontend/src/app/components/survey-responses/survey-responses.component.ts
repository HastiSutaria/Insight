import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.css'],
})
export class SurveyResponsesComponent implements OnInit {
  key: string;
  form: any;
  emails: string[] = [];
  dynamicData = [];
  dynamicColumns: string[] = ['No.', 'Email']
  
  constructor(
    private activateRoute: ActivatedRoute,
    private formService: FormDataService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      // Identifying the key and searching the form responses based on it
      this.key = params['key'];
      this.formService.getSurveyByKey(this.key);

      // Subscribe to any change in data
      this.formService.formByKey.subscribe((form) => {
        this.form = form;
        console.log(this.form.questions);

        // Extracting Emails from the data
        this.form.questions.map(
          (question: { responses: any[]; label: string }) => {

            // Adding Columns to display on table
            this.dynamicColumns.push(question.label)

            question.responses.map((response) => {
              this.emails.push(response.email);
            });
          }
        );

        this.emails = [...new Set(this.emails)];

        for (let i = 0; i < this.form.questions[0].responses.length; i++) {
          let dynamicObj = {};
          dynamicObj['No.'] = i+1
          
          for (let j = 0; j < this.form.questions.length; j++) {
            let lbl = this.form.questions[j].label;
            dynamicObj[lbl] = this.form.questions[j].responses[i].response;
            dynamicObj['Email'] = this.form.questions[j].responses[i].email;
          }
          
          this.dynamicData.push(dynamicObj);
        }
        console.log(this.dynamicData);
      });
    });
  }

  saveToExcel() {
    this.formService.exportAsExcelFile(this.dynamicData, this.form.name)
  }
}
