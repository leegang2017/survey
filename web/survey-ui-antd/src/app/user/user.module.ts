import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { LayoutModule } from "../layouts/layout.module";
import { ProviderModule } from "../providers/provider.module";
import { UserRoutingModule } from "./user-routing.module";
import { FileUploadModule } from "ng2-file-upload";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    ProviderModule,
    UserRoutingModule,
    FileUploadModule
  ],
  declarations: [
    UserEditComponent,
    UserListComponent,
  ],
  entryComponents: [],
  providers: []
})
export class UserModule {}
