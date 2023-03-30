import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NewSurveyComponent } from './components/admin-dashboard/new-survey/new-survey.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyCardComponent } from './components/survey-card/survey-card.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';
import { NewFormBuilderComponent } from './components/admin-dashboard/new-form-builder/new-form-builder.component';
import { FormQuestionComponent } from './components/admin-dashboard/form-question/form-question.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    NewSurveyComponent,

    AdminDashboardComponent,
    SurveyCardComponent,
    SurveyDetailsIntroComponent,
    NewFormBuilderComponent,
    FormQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
