import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SideNavInnerToolbarModule, SideNavOuterToolbarModule, SingleCardModule} from './layouts';
import {
    ChangePasswordFormModule
  , CreateAccountFormModule
  , FooterModule
  , LoginFormModule
  , ResetPasswordFormModule
} from './shared/components';
import {AppInfoService, AuthService, ScreenService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DxButtonModule, DxDataGridModule, DxFormModule, DxTextBoxModule} from "devextreme-angular";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        FooterModule,
        ResetPasswordFormModule,
        CreateAccountFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        UnauthenticatedContentModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        DxFormModule,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule
    ],
    providers: [
        AuthService,
        ScreenService,
        AppInfoService
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
