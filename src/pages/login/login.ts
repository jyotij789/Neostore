import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, private alertCtrl: AlertController, public apiservice: ProvidersApiservice) {
        // this.callback = this.callback.bind(this);
    }

    getHome() {
        let regex = /^[a-zA-Z]{2,30}$/;
        // let body = new FormData();
        // body.append('email', this.email);
        // body.append('password', this.password);
        console.log('email:', this.email);
        console.log('password:', this.password);
        let data = {
            'email': this.email,
            'password': this.password
        }

        if (this.email == null || this.email == "") {
            this.providerGlobal.alertMessage("Enter Username");
        }
        else if (this.password == null || this.password == "") {
            this.providerGlobal.alertMessage("Enter password");
        }
        else {
            this.apiservice.globalApiRequest('post', this.providerUrl.login, data, this.callback);

        }
    }
    callback = (response) => {
        let platform = this.providerGlobal.platformDetect();
        if (platform == "other") {
            console.log(response);
            let formattedData = JSON.parse(response.data);
            this.status = response.status;
            this.accessToken = formattedData.access_token;
            console.log("device accessToken", this.accessToken);
            localStorage.setItem("formattedResponse", JSON.stringify(this.accessToken));
            return this.gotoHome(this.status, this.accessToken);

        }
        else {
            console.log(response);
            this.formattedResponse = JSON.parse(response._body);
            this.status = response.status;
            this.accessToken = this.formattedResponse.data.access_token;
            console.log("browser access token", this.formattedResponse.access_token);
            localStorage.setItem("formattedResponse", JSON.stringify(this.accessToken));
            return this.gotoHome(this.status, this.accessToken);
        }


    }
    public gotoHome(status, token) {
        console.log("status", status);
        console.log("home navigation method");
        if (status == 200) {
            this.navCtrl.setRoot(HomePage);
            console.log(token);
            this.apiservice.globalApiRequest('get', this.providerUrl.Fetchaccount, token, this.homepageCallback);
        }
        else if (status == 401) {
            this.providerGlobal.alertMessage("Data missing..");
        }
        else if (status == 500) {
            this.providerGlobal.alertMessage("User login unsuccessful. Email or password is wrong. try again");
        }
        else {
            this.providerGlobal.alertMessage("Something is wrong");
        }
    }
    homepageCallback = (response) => {
        console.log(response);
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
