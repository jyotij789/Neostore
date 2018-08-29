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
import { Nav, Events, AlertController } from 'ionic-angular';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables';
import { ItemdetailsPage } from '../pages/itemdetails/itemdetails';
import { ProvidersGlobal } from '../providers/providers/global';
import { ProvidersApiservice } from '../providers/providers/apiservice'
import { ProvidersUrl } from '../providers/providers/url';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddProductmodalPage } from '../pages/add-productmodal/add-productmodal'
import { RatingProductmodalPage } from '../pages/rating-productmodal/rating-productmodal'
import { MyordersPage } from '../pages/myorders/myorders';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    public userFormattedData = [];
    public carts: number;
    pages: Array<{ title: string, component: any }>;
    constructor(public events: Events, public Providers: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();
        events.subscribe('cart:created', (data) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('cartdata', data);
        });
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.splashScreen.hide();
            let apiToken = "";
            let formattedData = JSON.parse(localStorage.getItem("formattedResponse"));
            if (!formattedData) {
                formattedData = [];
            }
            else {
                apiToken = formattedData;
                console.log('apiToken', apiToken);

                if (apiToken != null || apiToken != undefined) {
                    let data = null;
                    this.apiservice.globalApiRequest('get', this.providerUrl.Fetchaccount, data, apiToken, this.callback);
                    let formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
                    this.userFormattedData.push(formattedData.user_data);
                    this.carts = formattedData.total_carts;
                    console.log("this.carts", this.carts);
                }

            }
        });
    }

    callback = (response) => {
        this.Providers.stopLoader();
        let status = response.status;
        return this.getUserData(status, response);

    }
    public getUserData(status, response) {
        console.log("app.component getUserstatus", status);
        if (status == 200) {
            let data = response.data;
            this.nav.setRoot(HomePage, { homeData: data });
        }
        else if (status == 402) {
            this.Providers.alertMessage("Invalid Access Token", "Error");
        }
        else if (status == 500) {
            this.Providers.alertMessage("Could not update Account details.", "Error");
        }
        else {
            this.Providers.alertMessage("Something is Wrong.", "Error");
        }
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
        this.nav.push(TablesPage, { product_category_id: 1, category_name: 'Table' });
    }
    openSofaPage() {
        this.nav.push(TablesPage, { product_category_id: 3, category_name: 'Sofa' });

    }
    openChairPage() {
        this.nav.push(TablesPage, { product_category_id: 2, category_name: 'Chairs' });

    }
    openCupboardPage() {
        this.nav.push(TablesPage, { product_category_id: 4, category_name: 'Cupboard' });

    }
    openmycartpage() {
        this.nav.push(MycartPage);
    }
    myorderspage() {
        this.nav.push(MyordersPage);
    }
    logout() {
        localStorage.removeItem("formattedResponse");
        localStorage.removeItem("User_Account_Details");
        this.nav.setRoot(LoginPage);

    }
}

