import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from 'src/app/services/form-data.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  public Editor = ClassicEditor;

  inputTypes: string[] = ['paragraph','checkbox', 'date', 'radio', 'select', 'tel', 'number', 'toggle', 'slider', 'textarea'];

  constructor(private activatedRoute: ActivatedRoute, private formDataService: FormDataService, private router: Router, private toastr: ToastrService) {}
  isButtonDisabled = true; // Initialize button1 as disabled

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  } 
  onOptionAdded() {
    // Option added event handler
    console.log('Option added');
    if(this.dynamicForm.value.type === 'checkbox' || this.dynamicForm.value.type === 'radio' || this.dynamicForm.value.type ==='select'){
         this.isButtonDisabled =  true
    }
    else{
      this.isButtonDisabled = false;
      
    }
     // Enable the button
  }

  onSaveClick() {
    // Button2 click event handler
    console.log('Button 2 clicked');
  
  
  } 
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
    this.isButtonDisabled = false;
  }

  onSubmitSurveyForm(surveyForm: NgForm) {
    // const emailFormArray = <FormArray>this.myForm.controls.useremail;

    // if (isChecked) {
    //   emailFormArray.push(new FormControl(email));
    // } else {
    //   let index = emailFormArray.controls.findIndex(x => x.value == email)
    //   emailFormArray.removeAt(index);
    // }

    // const selectedColors = this.productForm.value.SelectedColor.map(
    //   (checked, i) => (checked ? this.colors[i].productColorId : null)
    // ).filter((v) => v !== null);

    
    console.log(this.formName);
    console.log(surveyForm)

    this.FinalBody.name = this.formName;
    this.FinalBody.description = this.description;
    this.FinalBody.dynamicInputs = this.dynamicInputs;
    console.log(this.FinalBody)
    this.formDataService.saveFormData(this.FinalBody).subscribe(res => {
      console.log('response recieved')
      this.toastr.success('Success', "Survey created!");
      this.router.navigate(['/admin-dashboard'])
    }, error => {
      console.log(error)
      // this.toastr.error(error)
    })
  }

  onDeleteOption(index: number) {
    (<FormArray>this.dynamicForm.get('options')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['admin-dashboard']).then(() => {
      window.location.reload();
    });
  }
}
