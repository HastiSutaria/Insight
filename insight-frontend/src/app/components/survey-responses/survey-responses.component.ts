import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface HashTable<T> {
  [label: string]: T;
}

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.css'],
})
export class SurveyResponsesComponent implements OnInit, AfterViewInit {
  key: string;
  form: any;
  emails: string[] = [];
  dynamicData = [];
  dynamicColumns: string[] = ['No.', 'Email'];
  dynamicColumnType: string[] = ['number', 'email']

  dataSource = new MatTableDataSource(this.dynamicData);

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Data Source', this.dataSource);
  }

  chart: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private formService: FormDataService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit(): void {
    console.log(this.dynamicColumns);
    console.log(this.dynamicColumnType);

    this.activateRoute.params.subscribe((params) => {
      // Identifying the key and searching the form responses based on it
      this.key = params['key'];
      this.formService.getSurveyByKey(this.key);

      // Subscribe to any change in data
      this.formService.formByKey.subscribe((form) => {
        this.form = form;

        this.form.questions.map(
          (question: { responses: any[]; label: string; type: string }) => {
            // Adding Columns to display on table


            this.dynamicColumns.push(question.label);
            this.dynamicColumnType.push(question.type);
            // Extracting Emails from the data
            question.responses.map((response) => {
              this.emails.push(response.email);
            });
          }
        );

        this.emails = [...new Set(this.emails)];

        for (let i = 0; i < this.form.questions[0].responses.length; i++) {
          let dynamicObj = {};
          dynamicObj['No.'] = i + 1;

          for (let j = 0; j < this.form.questions.length; j++) {
            // console.log('Submitted At', this.form.questions[j].responses[i])
            let lbl = this.form.questions[j].label;
            dynamicObj['Email'] = this.form.questions[j].responses[i].email;

            dynamicObj[lbl] = this.form.questions[j].responses[i].response;
          }

          this.dynamicData.push(dynamicObj);
        }
        console.log(this.dynamicData);
      });
    });
  }

  saveToExcel() {
    this.formService.exportAsExcelFile(this.dynamicData, this.form.name);
  }

 
}
