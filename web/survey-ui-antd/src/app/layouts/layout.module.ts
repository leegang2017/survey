import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { ProviderModule } from '../providers/provider.module';
import { HomeLayoutComponent } from './home-layout.component';
import { LoginLayoutComponent } from './login-layout.component';
import { HomeLayoutHeaderComponent } from './home-layout.header.component';


@NgModule({
    declarations: [
        HomeLayoutComponent,
        LoginLayoutComponent,
        HomeLayoutHeaderComponent,
    ],
    exports: [
        HomeLayoutComponent,
        LoginLayoutComponent,
        HomeLayoutHeaderComponent,
    ],
    imports: [CommonModule, NgZorroAntdModule, RouterModule, ProviderModule]
})
export class LayoutModule { }
