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
    constructor(public navCtrl: NavController, public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, private alertCtrl: AlertController, public apiservice: ProvidersApiservice) {
        // this.callback = this.callback.bind(this);
    }

    getHome() {
        let regex = /^[a-zA-Z]{2,30}$/;
        let body = new FormData();
        body.append('email', this.email);
        body.append('password', this.password);

        console.log('email:', this.email);
        console.log('password:', this.password);

        if (this.email == null || this.email == "") {
            this.providerGlobal.alertMessage("Enter Username");
        }
        else if (this.password == null || this.password == "") {
            this.providerGlobal.alertMessage("Enter password");
        }
        else {
            this.apiservice.globalApiRequest('post', this.providerUrl.login, body, this.callback);

        }
    }
    callback = (response) => {
        var formattedResponse = JSON.parse(response._body);
        console.log(formattedResponse.status);
        if (formattedResponse.status == 200) {
            localStorage.setItem("formattedResponse", JSON.stringify(formattedResponse.data));
            var formattedAccessToken = formattedResponse.data.access_token;
            console.log(formattedResponse.data.access_token);
            this.navCtrl.setRoot(HomePage);
        }
        else if (formattedResponse.status == 401) {
            this.providerGlobal.alertMessage(formattedResponse.message + formattedResponse.user_msg);
        }
        else if (formattedResponse.status == 500) {
            this.providerGlobal.alertMessage(formattedResponse.message);
        }
        else {
            this.providerGlobal.alertMessage(formattedResponse.message);
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
        // var platform = this.providerGlobal.platformCheck();
        // console.log(platform);

    }

    createAccount() {
        this.navCtrl.push(RegisterPage);
    }
    forgotPassword() {
        this.navCtrl.push(ForgotpasswordPage);
    }

}
