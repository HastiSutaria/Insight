import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { HashTable } from '../../survey-responses/survey-responses.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.css']
})
export class SurveyAnalyticsComponent implements OnInit, OnDestroy{
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
    private formService: FormDataService,

  ) {}


  ngOnInit(): void {

    this.activateRoute.params.subscribe((params) => {
      // Identifying the key and searching the form responses based on it
      this.key = params['key'];
      this.formService.getSurveyByKey(this.key);

      // Subscribe to any change in data
      this.formService.formByKey.subscribe((form) => {
        this.form = form;

        this.form.questions.map(
          (question: { responses: any[]; label: string; type: string }) => {
        
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
      });
    });
  }

  
  chartLabels: any[] = []
  createChart(question: any, context: any) {
    this.chartLabels.push(question.label)
    console.log(this.chartLabels)
    let data = question.responses.map((response) => response.response);
    const labelSet = [...new Set(data)];

    // Extracting count for each labels into a hash table
    var dataCount: HashTable<number> = {};

    for (let i = 0; i < labelSet.length; i++) {
      dataCount[<string>labelSet[i]] = 0;
    }
    for (let i = 0; i < data.length; i++) {
      dataCount[data[i]] += 1;
    }

    // Extracting value of count for each label as an array
    let finalData = Object.values(dataCount);
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
            label: 'Count',
            data: finalData,
            backgroundColor: getRandomColors(labelSet.length),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
      },
    });
  }
  ngOnDestroy(): void {
    //   if (this.chart) {
    //   this.chart.destroy();
    // }
      
  }
}