import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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
  
  inputTypes: string[] = ['paragraph','date', 'radio', 'select'];

  constructor( private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params['name'], params['description']);
      this.formName = params['name'];
      this.description = params['description'];
    });

    this.dynamicForm = new FormGroup({
      // 'name': new FormControl(null),
      'question': new FormControl(null, Validators.required),
      'type': new FormControl(null, [Validators.required]),
      'options': new FormArray([], Validators.required)
    })
  }

  onAddInputElement(){
    this.addingInputElement = true;
    // if (this.dynamicInputs.length < 1) {
    //   this.formName = this.dynamicForm.value.name;
    // }
    

    setTimeout(() => {
      this.addingInputElement = false;
      this.dynamicInputs.push({
        label: this.dynamicForm.value.question,
        type: this.dynamicForm.value.type,
        options: this.dynamicForm.value?.options

      });
      this.dynamicForm.reset();
    }, 500);

  }

  onAddOption() {
    const formControl = new FormControl(null);
    (<FormArray>this.dynamicForm.get('options')).push(formControl);
  }
  onSubmitSurveyForm(surveyForm: NgForm) {
    console.log(this.formName)
    this.FinalBody.name = this.formName
    this.FinalBody.dynamicInputs = this.dynamicInputs;
    // this.http.post('http://localhost:3000/create/form', this.FinalBody, { observe: 'body' }).subscribe((response: any) => {
    //   let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    //     data: {
    //       url: window.location.origin+`/forms/${response.key}/view/form`
          
    //     },
    //     height: '400px',
    //     width: '600px',
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.route.navigate(['/']);
    //   });
    // }, (error) => {
    //   this.snackbar.open(error.message, "Dismiss", {
    //     duration: 2000
    //   })
    // })
  }

  onDeleteOption(index: number) {
    (<FormArray>this.dynamicForm.get('options')).removeAt(index);
  }

  
}
