import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { UserListComponent } from './role/user-list/user-list.component';

const systemRoutes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
        { path: 'role/list', component: RoleListComponent },
        { path: 'role/edit', component: RoleEditComponent },
        { path: 'operator/list', component: UserListComponent },
      ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(systemRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemRoutingModule { }
