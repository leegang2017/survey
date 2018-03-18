import {
    NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, RestService } from './rest.service';
import { HelperService, StorageService, AuthService, WebsocketService,ToastService, LoadService } from './common.service';


@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        RestService, StorageService, AuthService, 
        HelperService,
        WebsocketService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        ToastService,
        LoadService,
    ]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}