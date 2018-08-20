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
import { AddressPage } from '../pages/address/address';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { ItemdetailsPage } from '../pages/itemdetails/itemdetails';
import { ProvidersGlobal } from '../providers/providers/global';
import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
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
        TablesPage,
        ItemdetailsPage
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
        ItemdetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        File,
        Base64,
        FileTransfer,
        ImagePicker,
        Camera,
        FilePath,
        Keyboard,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProvidersUrl,
        ProvidersApiservice,
        ProvidersGlobal,
        Network,
        HomePage,
        HTTP
    ]
})
export class AppModule { }
