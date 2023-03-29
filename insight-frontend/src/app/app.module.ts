import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyCardComponent } from './components/survey-card/survey-card.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, HeaderComponent, AdminDashboardComponent, SurveyCardComponent, SurveyDetailsIntroComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
