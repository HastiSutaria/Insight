import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-form-builder',
  templateUrl: './new-form-builder.component.html',
  styleUrls: ['./new-form-builder.component.css']
})
export class NewFormBuilderComponent {
  @Input() newInputForm!: FormGroup;

  newTextFormGroup = this.fb.group({
    id: ['q1'],
    orderNo: [2],
    type: ['question'],
    required: [true],
    question: this.fb.group({
      text: [''],
      placeholder: [''],
      type: ['freeText'],
      selectedAnswer: [''],
      offeredAnswers: this.fb.array([]),
    }),
  });

  constructor(
    private fb: FormBuilder,
    private rootFormGroup: FormGroupDirective,
  ) {}

  ngOnInit() {
    this.newInputForm = this.rootFormGroup.control;
    // console.log('mainForm', this.questionListArray);
    // this.mainForm.valueChanges.subscribe((value) => console.log(value));
    // console.log('mainForm', this.mainForm.get('questionList')['controls']);
  }

  async addNewQuestion(i: number, type: string) {
    let questionList = this.newInputForm.get('questionList') as FormArray;
    questionList.insert(i + 1, this.newTextFormGroup);
  }

  deleteQuestion(i: number) {
    // remove the target in form array
    this.questionList.removeAt(i);
  }

  get questionListArray() {
    return this.questionList.controls;
  }

  get questionList() {
    return this.newInputForm.get('questionList') as FormArray;
  }
}
