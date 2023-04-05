import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SurveyDetailsIntroComponent } from './components/admin-dashboard/survey-details-intro/survey-details-intro.component';
import { LoginComponent } from './components/login/login.component';
import { NewSurveyComponent } from './components/admin-dashboard/new-survey/new-survey.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
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
    path: 'newSurvey',
    component: NewSurveyComponent,
  },
  
  {
    path: 'user-dashboard',
    component: UserDashboardComponent
  },     
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
     
      {
        path: 'survey-details', // child route path
        component: SurveyDetailsIntroComponent, // child route component that the router renders
      }
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
