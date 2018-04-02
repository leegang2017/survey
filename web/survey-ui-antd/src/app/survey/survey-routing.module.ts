import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout.component';
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { SurveyManageComponent } from './survey-manage/survey-manage.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';
const routes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
    { path: 'surveyStart', component: SurveyStartComponent },
    { path: 'surveyResult', component: SurveyResultComponent },
    { path: 'surveyManage', component: SurveyManageComponent },
      ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SurveyRoutingModule { }
