import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';
import { LoginComponent } from './components/login/login.component';
import { NewSurveyComponent } from './components/admin-dashboard/new-survey/new-survey.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FillSurveyComponent } from './components/fill-survey/fill-survey.component';
import { SurveyResponsesComponent } from './components/survey-responses/survey-responses.component';
import { EditSurveyComponent } from './components/admin-dashboard/edit-survey/edit-survey.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SurveyAnalyticsComponent } from './components/admin-dashboard/survey-analytics/survey-analytics.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
path: 'home',
component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'newSurvey',
    component: NewSurveyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fillSurvey/:key/form',
    component: FillSurveyComponent,
  },
  { path: 'surveyResponses/:key',
  component: SurveyResponsesComponent,
  canActivate: [AuthGuard],

  },
  {
    path : 'surveyAnalytics/:key',
    component : SurveyAnalyticsComponent,
    canActivate : [AuthGuard]
  },
  { path: 'editSurvey/:key',
  component: EditSurveyComponent,
  canActivate: [AuthGuard],

  },
  {
    path: 'surveys',
    component: UserDashboardComponent
  },     
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
     
      {
        path: 'survey-details', // child route path
        component: SurveyDetailsIntroComponent,
        canActivate: [AuthGuard], // child route component that the router renders
      }
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
