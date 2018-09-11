import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice';
import { ProvidersUrl } from '../../providers/providers/url';
import { LoginPage } from '../login/login';
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
    public oldpassword: string;
    public confirmpassword: string;
    public newpassword: string;
    constructor(public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams, public providerglobal: ProvidersGlobal) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetPasswordPage');
    }

    changePassword() {
        let data = {
            'old_password': this.oldpassword,
            'password': this.confirmpassword,
            'confirm_password': this.newpassword
        }
        if (this.oldpassword == null || this.oldpassword == "") {
            this.providerglobal.alertMessage("Enter Password", "Error");
        }
        else if (this.newpassword == null || this.newpassword == "") {
            this.providerglobal.alertMessage("Enter New password", "Error");
        }
        else if (this.confirmpassword == null || this.confirmpassword == "") {
            this.providerglobal.alertMessage("Enter Confirm password", "Error");
        }
        else if (this.newpassword != this.confirmpassword) {
            this.providerglobal.alertMessage("Password must be same", "Error");
        }
        else {
            let token = "token";
            this.apiservice.globalApiRequest('post', this.providerUrl.changepass, data, token, this.callback);

        }
    }
    callback = (formattedData) => {
        console.log(formattedData);
        this.providerglobal.stopLoader();

        let status = formattedData.status;
        let message = formattedData.message;
        let user_msg = formattedData.user_message;
        if (status == 200) {
            this.providerglobal.alertMessage(message + "<br>" + user_msg, "Success");
            localStorage.removeItem("formattedResponse");
            this.navCtrl.push(LoginPage);
        }
        else if (status == 401 || status == 500 || status == 404) {
            this.providerglobal.alertMessage(message + "<br>" + user_msg, "Error");
        }
        else if (status == 0) {
            this.providerglobal.offlinealert();
        }
        else {
            this.providerglobal.alertMessage("Something is wrong", "Error");
        }

    }
}

