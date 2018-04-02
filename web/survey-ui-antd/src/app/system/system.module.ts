import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from '../layouts/layout.module';
import { ProviderModule } from '../providers/provider.module';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { UserListComponent } from './role/user-list/user-list.component';
import { SystemRoutingModule } from './system-routing.module';
import { UserRoleEditComponent } from './role/user-role-edit/user-role-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    ProviderModule,
    SystemRoutingModule,
  ],
  declarations: [
    RoleListComponent,
    RoleEditComponent,
    UserListComponent,
    UserRoleEditComponent,

  ],
  entryComponents: [
    UserRoleEditComponent,
  ],
  providers: [  ]
})
export class SystemModule {}
