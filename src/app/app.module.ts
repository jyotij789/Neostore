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
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { ItemdetailsPage } from '../pages/itemdetails/itemdetails';
import { ProvidersGlobal } from '../providers/providers/global';
import { HTTP } from '@ionic-native/http';
import { Http } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddProductmodalPage } from '../pages/add-productmodal/add-productmodal'
import { RatingProductmodalPage } from '../pages/rating-productmodal/rating-productmodal'
import { MyordersPage } from '../pages/myorders/myorders';
import { OrderPage } from '../pages/order/order';
import { AddAddressPage } from '../pages/add-address/add-address';
import { ListAddressPage } from '../pages/list-address/list-address';
import { Geolocation } from '@ionic-native/geolocation';

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
        MycartPage,
        TablesPage,
        OrderPage,
        MyordersPage,
        AddAddressPage,
        ListAddressPage,
        ItemdetailsPage,
        AddProductmodalPage,
        RatingProductmodalPage
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
        MycartPage,
        OrderPage,
        MyordersPage,
        AddAddressPage,
        ListAddressPage,
        TablesPage,
        ItemdetailsPage,
        AddProductmodalPage,
        RatingProductmodalPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Base64,
        ImagePicker,
        Camera,
        Keyboard,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProvidersUrl,
        ProvidersApiservice,
        ProvidersGlobal,
        Network,
        HomePage,
        HTTP,
        SocialSharing,
        Geolocation
    ]
})
export class AppModule { }
