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
        text: ['Question'],
        placeholder: ['xxx'],
        type: ['freeText'],
        selectedAnswer: [''],
        offeredAnswers: this.fb.array([]),
      }),
    });
    let checkboxFormGroup = this.fb.group({
     id : ['q1'],
     orderNo: [3],
     type: ['question'],
     required: [true],
     question : this.fb.group({
      text : ['Multiple selection'],
      type : ['multipleSelection'],
      selectedAnswer: ['first Answer'],
        offeredAnswers: this.fb.array([
          this.fb.group({
            id: ['01'],
            orderNo: [0],
            value: ['option 1'],
            remarkAnswer: [false],
            remarkAnswerValue: [''],
          }),
          this.fb.group({
            id: ['02'],
            orderNo: [1],
            value: ['option 2'],
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

     })
    })

   
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
        
        freeTextFormGroup,
        radioFormGroup,
        checkboxFormGroup
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
