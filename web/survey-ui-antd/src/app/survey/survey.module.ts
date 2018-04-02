import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ProviderModule } from "../providers/provider.module";
import { LayoutModule } from '../layouts/layout.module';
import { SurveyRoutingModule } from "./survey-routing.module";
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { SurveyManageComponent } from './survey-manage/survey-manage.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';
import { NzModalSurveyChoicesEditComponent } from './nz-modal-survey-choices-edit/nz-modal-survey-choices-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    LayoutModule,
    ProviderModule,
    SurveyRoutingModule,
  ],
  declarations: [
    SurveyStartComponent,
    SurveyManageComponent,
    SurveyResultComponent,
    NzModalSurveyChoicesEditComponent,
  ],
  entryComponents: [
    NzModalSurveyChoicesEditComponent
  ],
  providers: []
})
export class SurveyModule {}
