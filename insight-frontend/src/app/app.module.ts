import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NewSurveyComponent } from './components/admin-dashboard/new-survey/new-survey.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FillSurveyComponent } from './components/fill-survey/fill-survey.component';
import { SurveyResponsesComponent } from './components/survey-responses/survey-responses.component';
import { ToastrModule } from 'ngx-toastr';
import { EditSurveyComponent } from './components/admin-dashboard/edit-survey/edit-survey.component';
import { HomeComponent } from './components/home/home.component';
import { MatSortModule } from '@angular/material/sort';
import { SurveyAnalyticsComponent } from './components/admin-dashboard/survey-analytics/survey-analytics.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    EditSurveyComponent,
    HomeComponent,
    SurveyAnalyticsComponent,
    ProfileComponent,
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
    MatPaginatorModule,
    MatMomentDateModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSliderModule,
    CKEditorModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
