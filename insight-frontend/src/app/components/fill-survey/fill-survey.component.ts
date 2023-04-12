import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.css']
})
export class FillSurveyComponent implements OnInit {
key:string;
form:any;
questions:[]=[];
result:any={responses:[]};

constructor(private formService:FormDataService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){

}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.key = params['key']
      this.formService.getSurveyByKey(this.key);
      this.formService.formByKey.subscribe((form)=>{
        this.form = form;
        this.questions = this.form.questions;
        console.log(this.form);
      })
      
  })
}
onSubmitSurveyForm(surveyForm:NgForm){


  console.log('Survey Form Value', surveyForm.value)
  this.result['key'] = this.key

  for (const label in  surveyForm.value ) {
    if(label!=='email'){
      this.result.responses.push({email:surveyForm.value.email, response:surveyForm.value[label], submittedAt : new Date()})
    }
  }
  
 this.formService.SubmitResponse(this.result);
 this.toastr.success('Success',"You've filled the survey!")
 this.router.navigate(['/surveys']); 

}

}
/* 
response: {key/name: 'email/DOB/gender', value: 'M/F', type: '124322'}

*/