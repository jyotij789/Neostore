import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-forgotpassword',
    templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
    private username: string;
    private newPassword: string;
    public status: number;
    public message: string;
    public user_message: string;
    constructor(public navCtrl: NavController, public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForgotpasswordPage');

    }
    getNewPassword() {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
        let data = {
            'email': this.username,
            // 'password': this.newPassword
        }

        if (this.username == null || this.username == "") {
            this.providerGlobal.alertMessage("Enter Username", "Error");
        }
        else if (!emailRegex.test(this.username)) {
            this.providerGlobal.alertMessage("Enter Valid Email Address", "Error");
        }
        else if (this.newPassword == null || this.newPassword == "") {
            this.providerGlobal.alertMessage("Enter New password", "Error");
        }
        else {
            let token = null;
            this.apiservice.globalApiRequest('post', this.providerUrl.forgotpass, data, token, this.callback);
        }

    }

    callback = (response) => {
        this.providerGlobal.stopLoader();
        let formattedResponse = response;
        console.log("formattedResponse", formattedResponse);
        this.status = formattedResponse.status;
        return this.passwordChanged(this.status, response);

    }

    passwordChanged(status, formattedResponse) {
        console.log(status);
        if (status == 200) {
            this.providerGlobal.alertMessage(formattedResponse.user_message, "Success");
            this.navCtrl.push(LoginPage);
        }
        else if (status == 500 || status == 404) {
            this.providerGlobal.alertMessage(formattedResponse.user_message, "Error");
        }
        else if (this.status == 0) {
            this.providerGlobal.alertMessage(formattedResponse.error, "Error");
        }
    }
    createAccount() {
        this.navCtrl.push(RegisterPage);
    }
}
