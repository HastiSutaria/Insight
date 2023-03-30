import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent {
  @Input() questionFormGroup!: FormGroup;
  @Input() questionIndex!: number;

  newTextFormGroup() {
    return this.fb.group({
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
  }

  get newSingleSelection() {
    return this.fb.group({
      id: ['q1'],
      orderNo: [2],
      type: ['question'],
      required: [true],
      question: this.fb.group({
        text: [''],
        placeholder: [''],
        type: ['freeText'],
        selectedAnswer: [''],
        offeredAnswers: this.fb.array([
          this.fb.group({
            id: ['01'],
            orderNo: [1],
            value: ['Yes'],
            remarkAnswer: [true],
            remarkAnswerValue: ['idk'],
          }),
          this.fb.group({
            id: ['02'],
            orderNo: [2],
            value: ['No'],
            remarkAnswer: [false],
            remarkAnswerValue: ['idk'],
          }),
        ]),
      }),
    });
  }

  get newOfferedAnswers() {
    return this.fb.array([
      this.fb.group({
        id: ['01'],
        orderNo: [1],
        value: ['Yes'],
        remarkAnswer: [true],
        remarkAnswerValue: ['idk'],
      }),
      this.fb.group({
        id: ['02'],
        orderNo: [2],
        value: ['No'],
        remarkAnswer: [false],
        remarkAnswerValue: ['idk'],
      }),
    ]);
  }

  mainForm!: FormGroup;
  constructor(
    public rootFormGroup: FormGroupDirective,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.mainForm = this.rootFormGroup.control;
    // console.log('questionFormGroup', this.questionFormGroup);
  }

  addNew() {
    console.log('add');
  }

  deleteQ() {}

  onChangeQuestionType(i: number) {
    let currentQuestion = this.questionList.at(i) as FormGroup;
    const selectedType = this.questionFormGroup.get('question.type')?.value;
    const orderNo = this.questionFormGroup.get('orderNo')?.value;
    console.log(selectedType, currentQuestion);

    // this.questionList.removeAt(1);
    if (selectedType === 'freeText') {
      currentQuestion.setValue(this.newTextFormGroup);
      currentQuestion.patchValue({
        orderNo: orderNo,
      });
    } else if (selectedType === 'singleSelection') {
      currentQuestion.patchValue({
        orderNo: orderNo,
        question: {
          type: 'singleSelection',
        },
      });
      let offeredAnswers = currentQuestion.get(
        'question.offeredAnswers'
      ) as FormArray;

      while (offeredAnswers.length !== 0) {
        offeredAnswers.removeAt(0);
      }
      this.addNewRadioOption(i);
      this.addNewRadioOption(i);
      // this.newOfferedAnswers.value.forEach((answer) => {
      //   offeredAnswers.controls.push(answer);
      // });
      // offeredAnswers.patchValue(newForm);
      // offeredAnswers.push(answer);
    }
  }

  removeRadioAnswer(i: number) {
    // remove the target in form array
    let singleSelectionAnswers = this.questionFormGroup.get(
      'question.offeredAnswers'
    ) as FormArray;
    let targetItem = singleSelectionAnswers.at(i);
    let targetItemOrder = targetItem.get('orderNo')?.value;
    singleSelectionAnswers.removeAt(i);

    if (i !== 0) {
      // update order No
      let prevOrderItem = singleSelectionAnswers.at(i - 1) as FormGroup;
      let nextOrderItem = singleSelectionAnswers.at(i) as FormGroup;
      prevOrderItem.patchValue({
        orderNo: targetItemOrder - 1,
      });
      nextOrderItem.patchValue({
        orderNo: targetItemOrder,
      });
    }
  }

  onRadioCheck(answer: FormGroup, i: number) {
    let targetItem = this.questionFormGroup.get('question.selectedAnswer');
    // targetItem.setValue(answer.value.value);
    console.log('target', targetItem);
  }

  addNewRadioOption(i: number) {
    // Insert next to the parent question

    let singleSelectionAnswers = this.questionFormGroup.get(
      'question.offeredAnswers'
    ) as FormArray;
    let newFormGroup: FormGroup = this.fb.group({
      id: ['01'],
      orderNo: [i + 1],
      value: [''],
      remarkAnswer: [false],
      remarkAnswerValue: [''],
    });
    singleSelectionAnswers.insert(i + 1, newFormGroup);

    // // Update the order No
    // const nextNumberInOrder = singleSelectionAnswers.at(i) as FormGroup;
    // if (nextNumberInOrder) {
    //   nextNumberInOrder.patchValue({
    //     orderNo: i + 1 + 1,
    //   });
    // }
    // let test = singleSelectionAnswers.forEach((value) => {
    //     console.log(value.controls);
    //   });
  }

  onRemarkModeChange(answerIndex: number, isRemarkRequired: boolean) {
    let singleSelectionAnswers = this.questionFormGroup.get(
      'question.offeredAnswers'
    ) as FormArray;

    let selectedAns = singleSelectionAnswers.at(answerIndex);
    console.log(answerIndex, isRemarkRequired, selectedAns);
    selectedAns.patchValue({
      remarkAnswer: isRemarkRequired,
    });
    console.log(answerIndex, isRemarkRequired, selectedAns);
  }

  get questionList() {
    return this.mainForm.get('questionList') as FormArray;
  }

  get questionDetails() {
    return this.questionFormGroup.controls;
  }

  get questionType() {
    return this.questionFormGroup.get('question.type');
  }
  
  get questionOfferedAnswers () {
    return this.questionFormGroup.get('question.offeredAnswers')
  }
}
