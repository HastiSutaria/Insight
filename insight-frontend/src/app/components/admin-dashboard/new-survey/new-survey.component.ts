import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css'],
})
export class NewSurveyComponent implements OnInit {
  name: String = '';
  description: String = '';
  constructor( private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params['name'], params['description']);
      this.name = params['name'];
      this.description = params['description'];
    });
  }
}
