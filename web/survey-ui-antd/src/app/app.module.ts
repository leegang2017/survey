import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from './layouts/layout.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';

import { AppConfig } from './app.config';
import { CoreModule } from './providers/core.module';
import { ProviderModule } from './providers/provider.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    ProviderModule,
  ],
  entryComponents: [
  ],

  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
