import { Component } from '@angular/core';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent {
  name: String = 'Argusoft Survey'
  description: String = 'This is a simple survey form.'

  addShortAnswer() {
    
  }
}
