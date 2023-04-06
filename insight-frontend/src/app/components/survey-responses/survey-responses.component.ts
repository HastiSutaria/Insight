import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.css']
})
export class SurveyResponsesComponent implements OnInit {
  key:string;
  form:any;
  emails:string[]=[];
  selectedEmail:string;
  clicked:Boolean;

  constructor(private activateRoute:ActivatedRoute,private formService:FormDataService ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params)=>{
      this.key = params['key'];
      this.formService.getSurveyByKey(this.key);
      this.formService.formByKey.subscribe((form)=>{
        this.form = form;
        this.form.questions.map((question)=>{
          question.responses.map((response)=>{
           this.emails.push(response.email)
          })
          
        })
        this.emails = [...new Set(this.emails)]
        
      });
    })
    
  }
  onClickViewResponse(event:string){
    this.selectedEmail = event;
    this.clicked = true;
    
  }

}
