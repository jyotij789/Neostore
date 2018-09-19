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
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddProductmodalPage } from '../pages/add-productmodal/add-productmodal'
import { RatingProductmodalPage } from '../pages/rating-productmodal/rating-productmodal'
import { MyordersPage } from '../pages/myorders/myorders';
import { OrderPage } from '../pages/order/order';
import { AddAddressPage } from '../pages/add-address/add-address';
import { ListAddressPage } from '../pages/list-address/list-address';
import { Geolocation } from '@ionic-native/geolocation';
import { StoreLocatorPage } from '../pages/store-locator/store-locator';
import { ProvidersNetwork } from '../providers/providers/network';
import { Stripe } from '@ionic-native/stripe';
import { PaycardPage } from '../pages/paycard/paycard';
import { Push } from '@ionic-native/push';

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
        StoreLocatorPage,
        AddProductmodalPage,
        RatingProductmodalPage,
        PaycardPage
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
        StoreLocatorPage,
        ItemdetailsPage,
        AddProductmodalPage,
        PaycardPage,
        RatingProductmodalPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ImagePicker,
        Camera,
        Stripe,
        Keyboard,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ProvidersUrl,
        ProvidersApiservice,
        ProvidersGlobal,
        ProvidersNetwork,
        Network,
        HomePage,
        HTTP,
        SocialSharing,
        Geolocation,
        Push
    ]
})
export class AppModule { }
