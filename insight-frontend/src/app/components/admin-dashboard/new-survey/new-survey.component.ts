import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css'],
})
export class NewSurveyComponent implements OnInit {
  formName: String = '';
  description: String = '';
  dynamicForm!: FormGroup;
  surveyForm!: NgForm;
  FinalBody: any = {};
  addingInputElement: Boolean = false;
  dynamicInputs = [];

  inputTypes: string[] = ['paragraph', 'date', 'radio', 'select'];

  constructor(private activatedRoute: ActivatedRoute, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params['name'], params['description']);
      this.formName = params['name'];
      this.description = params['description'];
    });

    this.dynamicForm = new FormGroup({
      'name': new FormControl(this.formName),
      'description' : new FormControl(this.description),
      'question': new FormControl(null, Validators.required),
      'type': new FormControl(null, [Validators.required]),
      'options': new FormArray([], Validators.required)
    })
  }

  onAddInputElement() {
    this.addingInputElement = true;
    // if (this.dynamicInputs.length < 1) {
    //   this.formName = this.dynamicForm.value.name;
    // }

    setTimeout(() => {
      this.addingInputElement = false;
      this.dynamicInputs.push({
        label: this.dynamicForm.value.question,
        type: this.dynamicForm.value.type,
        options: this.dynamicForm.value?.options,
      });
      this.dynamicForm.reset();
    }, 500);
  }

  onAddOption() {
    const formControl = new FormControl(null);
    (<FormArray>this.dynamicForm.get('options')).push(formControl);
  }

  onSubmitSurveyForm(surveyForm: NgForm) {
    console.log(this.formName);
    console.log(surveyForm)

    this.FinalBody.name = this.formName;
    this.FinalBody.description = this.description;
    this.FinalBody.dynamicInputs = this.dynamicInputs;
    console.log(this.FinalBody)
    this.formDataService.saveFormData(this.FinalBody).subscribe(res => {
      console.log('response recieved')
    }, error => {
      console.log(error)
    })
  }

  onDeleteOption(index: number) {
    (<FormArray>this.dynamicForm.get('options')).removeAt(index);
  }
}
