import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NewSurveyComponent } from './components/admin-dashboard/new-survey/new-survey.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyResponsesComponent } from './components/survey-responses/survey-responses.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FillSurveyComponent } from './components/fill-survey/fill-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    NewSurveyComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    SurveyDetailsIntroComponent,
    FillSurveyComponent,
    SurveyResponsesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
