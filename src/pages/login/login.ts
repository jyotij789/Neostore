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

    constructor(public navCtrl: NavController, public providerglobal: ProvidersGlobal, public providerUrl: ProvidersUrl, private alertCtrl: AlertController, public apiservice: ProvidersApiservice) {
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
            this.providerglobal.alertMessage("Enter Username", "Error");
        }
        else if (!emailRegex.test(this.email)) {
            this.providerglobal.alertMessage("Enter Valid Email", "Error");
        }
        else if (this.password == null || this.password == "") {
            this.providerglobal.alertMessage("Enter password", "Error");
        }
        else {
            let token = null;
            this.apiservice.globalApiRequest('post', this.providerUrl.login, data, token, this.callback);
        }
    }
    callback = (response) => {
        this.providerglobal.stopLoader();
        console.log("login", response);
        return this.gotoHome(response);

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
        this.email = 'jyot123@gmail.com';
        this.password = 'jyot123';

    }

    public gotoHome(response) {
        let formattedData = response;
        this.status = formattedData.status;
        console.log("device/browser accessToken", this.accessToken);
        if (this.status == 200) {
            this.accessToken = formattedData.data.access_token;
            localStorage.setItem("formattedResponse", JSON.stringify(this.accessToken));
            this.navCtrl.setRoot(HomePage);
        }
        else if (this.status == 401 || this.status == 500) {
            this.providerglobal.alertMessage("User login unsuccessful. Email or password is wrong. try again", "Error");
        }
        else if (this.status == 0) {
            this.providerglobal.offlinealert();
        }
    }

    createAccount() {
        this.navCtrl.push(RegisterPage);
    }
    forgotPassword() {

        this.navCtrl.push(ForgotpasswordPage);
    }

}
