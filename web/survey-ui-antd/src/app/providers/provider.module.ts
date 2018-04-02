import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgThumbDirective, PermissionDirective, NgSortableDirective, VarDirective } from './common.directive';
import { RolesPipe, AgePipe } from './common.pipe';

@NgModule({
    declarations: [
        NgThumbDirective,
        PermissionDirective,
        NgSortableDirective,
        VarDirective,
        RolesPipe,
        AgePipe,
    ],
    exports: [
        NgThumbDirective,
        PermissionDirective,
        NgSortableDirective,
        VarDirective,
        RolesPipe,
        AgePipe,
    ],
    imports: [CommonModule, NgZorroAntdModule, HttpClientModule],
    providers: [
    ]
})
export class ProviderModule { }
