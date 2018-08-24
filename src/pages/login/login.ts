import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { MyAccountPage } from '../my-account/my-account';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public email: string;
    public password: string;
    public userInfo: {};
    public formattedResponse: any;
    public status: number;
    public responseType: string;
    public accessToken: any;
    public userFormattedData = [];
    public carts: number;

    constructor(public navCtrl: NavController, public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, private alertCtrl: AlertController, public apiservice: ProvidersApiservice) {
        // this.callback = this.callback.bind(this);
    }

    getHome() {
        let regex = /^[a-zA-Z]{2,30}$/;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

        console.log('email:', this.email);
        console.log('password:', this.password);
        let data = {
            'email': this.email,
            'password': this.password
        }
        if (this.email == null || this.email == "") {
            this.providerGlobal.alertMessage("Enter Username", "Error");
        }
        else if (!emailRegex.test(this.email)) {
            this.providerGlobal.alertMessage("Enter Valid Email", "Error");
        }
        else if (this.password == null || this.password == "") {
            this.providerGlobal.alertMessage("Enter password", "Error");
        }
        else {
            let token = "";
            this.apiservice.globalApiRequest('post', this.providerUrl.login, data, token, this.callback);
        }
    }
    callback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("login", response);
        return this.gotoHome(response);

    }

    public gotoHome(response) {
        let formattedData = response;
        this.status = formattedData.status;
        console.log("device/browser accessToken", this.accessToken);
        if (this.status == 200) {
            this.accessToken = formattedData.data.access_token;
            localStorage.setItem("formattedResponse", JSON.stringify(this.accessToken));
            let data = null;
            let apitoken = this.accessToken;
            this.apiservice.globalApiRequest('get', this.providerUrl.Fetchaccount, data, apitoken, this.homepageCallback);
        }
        else if (this.status == 401) {
            this.providerGlobal.alertMessage("User login unsuccessful. Email or password is wrong. try again", "Error");
        }
        else if (this.status == 500) {
            this.providerGlobal.alertMessage("User login unsuccessful. Email or password is wrong. try again", "Error");
        }
        else {
            this.providerGlobal.alertMessage("Try again to load", "Error");
        }
    }

    homepageCallback = (response) => {
        this.providerGlobal.stopLoader();
        let status = response.status;
        return this.getUserData(status, response);

    }
    public getUserData(status, response) {
        console.log("login getUserstatus", status);
        console.log("device/browser homepageCallback response", response);
        if (status == 200) {
            let data = response.data;
            localStorage.setItem("User_Account_Details", JSON.stringify(data));
            let formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
            this.userFormattedData.push(formattedData.user_data);
            console.log("this.userFormattedData", this.userFormattedData);
            this.carts = formattedData.total_carts;
            console.log("this.carts", this.carts);
            this.navCtrl.setRoot(HomePage, { homeData: data });

        }
        else if (status == 402) {
            this.providerGlobal.alertMessage("Invalid Access Token", "Error");
        }
        else if (status == 500) {
            this.providerGlobal.alertMessage("Could not update Account details.", "Error");
        }
        else {
            this.providerGlobal.alertMessage("Method has to be post.", "Error");
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');

    }

    createAccount() {
        this.navCtrl.push(RegisterPage);
    }
    forgotPassword() {

        this.navCtrl.push(ForgotpasswordPage);
    }

}
