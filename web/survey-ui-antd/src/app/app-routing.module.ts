import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { SurveyManageComponent } from './survey-manage/survey-manage.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';
import { CleanComponent } from './clean/clean.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
  { path: 'survey', component: HomeLayoutComponent, children: [
    { path: 'surveyStart', component: SurveyStartComponent },
    { path: 'surveyResult', component: SurveyResultComponent },
    { path: 'surveyManage', component: SurveyManageComponent },
    { path: 'clean', component: CleanComponent },
  ] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],

})
export class AppRoutingModule { }
