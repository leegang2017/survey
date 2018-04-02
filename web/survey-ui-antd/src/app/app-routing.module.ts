import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
  // { path: 'survey', component: HomeLayoutComponent, children: [
  //   { path: 'surveyStart', component: SurveyStartComponent },
  //   { path: 'surveyResult', component: SurveyResultComponent },
  //   { path: 'surveyManage', component: SurveyManageComponent },
  //   { path: 'clean', component: CleanComponent },
  // ] },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule',
  },
  {
    path: 'survey',
    loadChildren: 'app/survey/survey.module#SurveyModule',
  },
  {
    path: 'system',
    loadChildren: 'app/system/system.module#SystemModule',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],

})
export class AppRoutingModule { }
