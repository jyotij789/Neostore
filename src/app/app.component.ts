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
import { StoreLocatorPage } from '../pages/store-locator/store-locator';
import { ProvidersNetwork } from '../providers/providers/network'
import { Network } from '@ionic-native/network';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    public carts: number;
    public userFormattedData: any;
    public email: string;
    public first_name: string;
    public last_name: string;
    public profile_pic: string;
    pages: Array<{ title: string, component: any }>;
    constructor(public network: Network,
        public events: Events,
        public Providers: ProvidersGlobal,
        public providerUrl: ProvidersUrl,
        public apiservice: ProvidersApiservice,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public providerNetwork: ProvidersNetwork) {

        this.initializeApp();
        events.subscribe('cart:created', (data) => {
            console.log('cartdata', data);
            this.carts = data;
        });
        events.subscribe('user:created', (user) => {
            this.carts = user.total_carts;
            this.userFormattedData = user.user_data;
            console.log('userdata', this.userFormattedData.email);
            this.email = this.userFormattedData.email;
            this.first_name = this.userFormattedData.first_name;
            this.last_name = this.userFormattedData.last_name;
            this.email = this.userFormattedData.email;
            let photo: any = this.userFormattedData.profile_pic;
            (photo == "" || photo == null) ? this.profile_pic = "../../assets/imgs/logo.png" : this.profile_pic = this.userFormattedData[0].profile_pic;

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
                    this.nav.setRoot(HomePage);

                }

            }
            this.network.onConnect().subscribe(res => {
                console.log("onConnect", res);
                if (this.network.type != "unknown" || this.network.type != undefined) {
                    this.providerNetwork.onlineAlertDismiss();
                } else {
                    console.log("not connected");
                    this.providerNetwork.offlineAlert();

                }

            });

            this.network.onDisconnect().subscribe(res => {
                console.log('network was Disconnected');
                this.providerNetwork.offlineAlert();

            });

        });
    }

    openmyaccountpage() {
        this.nav.push(MyAccountPage);
    }
    opentablespage(id, name) {
        console.log(name);
        console.log(id);
        this.nav.push(TablesPage, { product_category_id: id, category_name: name });
    }
    openmycartpage() {
        this.nav.push(MycartPage);
    }
    myorderspage() {
        this.nav.push(MyordersPage);
    }
    storelocator() {
        this.nav.push(StoreLocatorPage);
    }
    logout() {
        localStorage.removeItem("formattedResponse");
        localStorage.removeItem("User_Account_Details");
        this.nav.setRoot(LoginPage);

    }
}

