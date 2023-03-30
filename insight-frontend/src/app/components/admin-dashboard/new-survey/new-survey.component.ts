import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css'],
})
export class NewSurveyComponent implements OnInit {
  name: String = '';
  description: String = '';
  newInputForm: FormGroup;
  
  constructor(private activatedRoute: ActivatedRoute, public fb: FormBuilder) {
    let freeTextFormGroup = this.fb.group({
      id: ['q1'],
      orderNo: [1],
      type: ['question'],
      required: [true],
      question: this.fb.group({
        text: ['What is your favourite fruit?'],
        placeholder: ['e.g Apple, Tomato, etc'],
        type: ['freeText'],
        selectedAnswer: [''],
        offeredAnswers: this.fb.array([]),
      }),
    });

    let titleFormGroup = this.fb.group({
      id: ['q1'],
      orderNo: [0],
      type: ['title'],
      required: [true],
      title: this.fb.group({
        text: ['AMLCFT'],
        description: ['question title'],
        type: ['title'],
      }),
    });

    let radioFormGroup = this.fb.group({
      id: ['q1'],
      orderNo: [2],
      type: ['question'],
      required: [true],
      question: this.fb.group({
        text: ['Radio Question'],
        type: ['singleSelection'],
        selectedAnswer: ['first Answer'],
        offeredAnswers: this.fb.array([
          this.fb.group({
            id: ['01'],
            orderNo: [0],
            value: ['Yes'],
            remarkAnswer: [false],
            remarkAnswerValue: [''],
          }),
          this.fb.group({
            id: ['02'],
            orderNo: [1],
            value: ['No'],
            remarkAnswer: [false],
            remarkAnswerValue: [''],
          }),
          this.fb.group({
            id: ['03'],
            orderNo: [2],
            value: ['Others'],
            remarkAnswer: [true],
            remarkAnswerValue: [''],
          }),
        ]),
      }),
    });
    this.newInputForm = this.fb.group({
      questionList: this.fb.array([
        titleFormGroup,
        freeTextFormGroup,
        radioFormGroup,
      ]),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params['name'], params['description'])
      this.name = params['name'];
      this.description = params['description'];
    });
  }


  onSubmit() {}

  onAddInput() {}
}
