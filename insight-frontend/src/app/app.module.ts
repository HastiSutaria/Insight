import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NewSurveyComponent } from './components/new-survey/new-survey.component';
import { NewSurveyInputCardComponent } from './components/new-survey/new-survey-input-card/new-survey-input-card.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, HeaderComponent, NewSurveyComponent, NewSurveyInputCardComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
