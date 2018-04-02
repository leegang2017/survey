import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
        { path: 'list', component: UserListComponent },
        { path: 'edit', component: UserEditComponent },
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
export class UserRoutingModule { }
