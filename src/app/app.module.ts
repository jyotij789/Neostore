import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ProvidersUrl } from '../providers/providers/url';
import { ProvidersApiservice } from '../providers/providers/apiservice';
import { MyAccountPage } from '../pages/my-account/my-account';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { NavController } from 'ionic-angular';
import { AddressPage } from '../pages/address/address';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage} from '../pages/tables/tables';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';

import { ProvidersGlobal } from '../providers/providers/global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    MyAccountPage,
    EditProfilePage,
    ResetPasswordPage,
    AddressPage,
    MycartPage,
    TablesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotpasswordPage,
    MyAccountPage,
    EditProfilePage,
    ResetPasswordPage,
    AddressPage,
    MycartPage,
    TablesPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersUrl,
    ProvidersApiservice,
    ProvidersGlobal,
    Network
  ]
})
export class AppModule {}
