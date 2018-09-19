import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyAccountPage } from '../pages/my-account/my-account';
import { ViewChild } from '@angular/core';
import { Nav, Events } from 'ionic-angular';
import { MycartPage } from '../pages/mycart/mycart';
import { TablesPage } from '../pages/tables/tables';
import { ProvidersGlobal } from '../providers/providers/global';
import { ProvidersApiservice } from '../providers/providers/apiservice'
import { ProvidersUrl } from '../providers/providers/url';
import { MyordersPage } from '../pages/myorders/myorders';
import { StoreLocatorPage } from '../pages/store-locator/store-locator';
import { ProvidersNetwork } from '../providers/providers/network'
import { Network } from '@ionic-native/network';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Keyboard } from '@ionic-native/keyboard';
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
        public providerNetwork: ProvidersNetwork,
        private push: Push) {

        this.initializeApp();
        events.subscribe('cart:created', (data) => {
            console.log('cartdata', data);
            this.carts = data;
        });
        events.subscribe('user:created', (user) => {
            this.carts = user.total_carts;
            this.userFormattedData = user.user_data;
            this.email = this.userFormattedData.email;
            this.first_name = this.userFormattedData.first_name;
            this.last_name = this.userFormattedData.last_name;
            this.email = this.userFormattedData.email;
            let photo: any = this.userFormattedData.profile_pic;
            (photo == "" || photo == null) ? this.profile_pic = "../../assets/imgs/logo.png" : this.profile_pic = this.userFormattedData.profile_pic;

        });
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // Keyboard.disableScroll(true);
            this.splashScreen.hide();
            this.pushSetup();
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
    pushSetup() {
        const options: PushOptions = {
            android: {
                senderID: '941222465816'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };

        const pushObject: PushObject = this.push.init(options);


        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
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

