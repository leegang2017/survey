import {
    NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidateService } from './validate.service';
import { AuthInterceptor, RestService } from './rest.service';
import { HelperService, StorageService, AuthService, UploaderService, CompressImgService, WebsocketService } from './common.service';


@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [
        RestService, StorageService, AuthService, ValidateService,
        HelperService,
        CompressImgService,
        UploaderService,
        WebsocketService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
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