import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import Chart from 'chart.js/auto';


export interface HashTable<T> {
  [label: string] : T;
}

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
  dynamicColumns: string[] = ['No.', 'Email'];

  @ViewChild('chart') chartElementRef: ElementRef;
  @ViewChild('chart2') chartElementRef2: ElementRef;

  chart: any;

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
        // console.log(this.form.questions);

        this.form.questions.map(
          (question: { responses: any[]; label: string; type: string }) => {
            // Adding Columns to display on table
            this.dynamicColumns.push(question.label);
            
            // Extracting Emails from the data
            question.responses.map((response) => {
              this.emails.push(response.email);
            });
            
            // Creating new charts for radio and select fields
            if (question.type === 'radio') {
              let context = this.chartElementRef.nativeElement;
              this.createChart(question, context);
            }
            if (question.type === 'select') {
              let context = this.chartElementRef2.nativeElement;
              this.createChart(question, context);
            }

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
        // console.log(this.dynamicData);
      });
    });
  }

  saveToExcel() {
    this.formService.exportAsExcelFile(this.dynamicData, this.form.name);
  }

  createChart(question: any, context:any) {

    console.log(question.responses)
    let data = question.responses.map((response) => response.response);
    const labelSet = [...new Set(data)];
    
    // Extracting count for each labels into a hash table
    var dataCount: HashTable<number> = {};
    
    for(let i = 0;i<labelSet.length;i++){
      dataCount[<string>labelSet[i]] = 0;
    }
    for(let i =0;i<data.length;i++){
      dataCount[data[i]] += 1;
    }
    console.log(dataCount)

    // Extracting value of count for each label as an array
    let finalData = Object.values(dataCount)
    // console.log(finalData)
    
    const getRandomColors = (length: number) => {
      let colors = [];
      for (let i = 0; i < length + 1; i++) {
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        colors.push('#' + ('000000' + color).slice(-6));
      }
      return colors;
    };

    this.chart = new Chart(context, {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labelSet,
        datasets: [
          {
            label: "Count",
            data: finalData,
            backgroundColor: getRandomColors(labelSet.length),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
