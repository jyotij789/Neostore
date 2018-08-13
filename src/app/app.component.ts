import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { MyAccountPage } from '../pages/my-account/my-account';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AddressPage } from '../pages/address/address';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables';
import { ItemdetailsPage } from '../pages/itemdetails/itemdetails';
import { ProvidersGlobal } from '../providers/providers/global';
import { ProvidersApiservice } from '../providers/providers/apiservice'
import { ProvidersUrl } from '../providers/providers/url';
import { Http } from '@angular/http';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            var apiToken = "";
            var formattedData = JSON.parse(localStorage.getItem("formattedResponse"));
            if (!formattedData) {
                formattedData = [];
            }
            else {
                apiToken = formattedData;
                console.log('apiToken', apiToken);

                if (apiToken != null) {
                    this.apiservice.globalApiRequest('get', this.providerUrl.Fetchaccount, apiToken, this.callback);
                }

            }
        });
    }

    callback = (response) => {
        this.nav.setRoot(HomePage, { homeData: response });
    }
    // openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    // }
    openmyaccountpage() {
        this.nav.push(MyAccountPage);
    }
    opentablespage() {
        this.nav.push(TablesPage);
    }
    openmycartpage() {
        this.nav.setRoot(MycartPage);

    }
    logout() {
        localStorage.removeItem("formattedResponse");
        this.nav.setRoot(LoginPage);

    }
}

