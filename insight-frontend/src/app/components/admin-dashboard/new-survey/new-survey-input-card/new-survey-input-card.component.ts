import { Component } from '@angular/core';

@Component({
  selector: 'app-new-survey-input-card',
  templateUrl: './new-survey-input-card.component.html',
  styleUrls: ['./new-survey-input-card.component.css']
})
export class NewSurveyInputCardComponent {
  inputType: String = 'Short Answer Text'
}
