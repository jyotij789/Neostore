import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProvidersUrl } from '../../providers/providers/url';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { LoginPage } from '../login/login';
// import { ProvidersApiservice } from '../../providers/providers/apiservice';
@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    public status: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public phoneNumber: any;
    public autoManufacturers: any;
    public term: any;
    public gender: string;
    constructor(private alertCtrl: AlertController, public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams, public providerurl: ProvidersUrl, public apiservice: ProvidersApiservice) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    registeruser() {
        let regex = /^[a-zA-Z]{2,30}$/;
        let phoneRegex = /^[0-9#*+]{10,12}$/;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

        let data = {
            'first_name': this.firstName,
            'last_name': this.lastName,
            'email': this.email,
            'password': this.password,
            'confirm_password': this.confirmPassword,
            'gender': this.firstName,
            'phone_no': this.phoneNumber,
        }

        if (this.firstName == null || this.firstName == "") {
            this.providerglobal.alertMessage("Enter First Name", "Error");
        }
        else if (!regex.test(this.firstName)) {
            this.providerglobal.alertMessage("Enter First Name of 2-30 characters", "Error");
        }
        else if (this.lastName == null || this.lastName == "") {
            this.providerglobal.alertMessage("Enter Lastname", "Error");
        }
        else if (!regex.test(this.lastName)) {
            this.providerglobal.alertMessage("Enter Last Name of 2-30 characters", "Error");
        }
        else if (this.email == null || this.email == "") {
            this.providerglobal.alertMessage("Enter Valid Email", "Error");
        }
        else if (!emailRegex.test(this.email)) {
            this.providerglobal.alertMessage("Enter Valid Email", "Error");
        }
        else if (this.password == null || this.password == "") {
            this.providerglobal.alertMessage("Enter Password", "Error");
        }
        else if (this.confirmPassword == null || this.confirmPassword == "") {
            this.providerglobal.alertMessage("Enter Confirm password", "Error");
        }
        else if (this.phoneNumber == null) {
            this.providerglobal.alertMessage("Enter Phone Number", "Error");
        }
        else if (this.password != this.confirmPassword) {
            this.providerglobal.alertMessage("Password must be same", "Error");
        }
        else if (!phoneRegex.test(this.phoneNumber)) {
            this.providerglobal.alertMessage("Phone number must be between of 10-12 digits", "Error");
        }
        else {
            let token = "token";
            this.apiservice.globalApiRequest('post', this.providerurl.register, data, token, this.callback);
        }
    }

    callback = (response) => {
        console.log("registration", response);
        this.providerglobal.stopLoader();
        this.status = response.status;
        console.log("device/browser accessToken", this.status);
        if (this.status == 200) {
            this.providerglobal.alertMessage(response.user_msg, "Success");
            this.navCtrl.setRoot(LoginPage);

        }
        else if (this.status == 401 || this.status == 500) {
            this.providerglobal.alertMessage(response.user_msg, "Error");
        }
        else if (this.status == 0) {
            this.providerglobal.offlinealert();
        }
    }
    termsChecked($event) {
        if (!$event.checked) {
            this.checkboxError();
        }
    }
    genderError() {
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Choose Gender',
            buttons: ['Ok']
        });
        alert.present();
    }
    checkboxError() {
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Select Checkbox',
            buttons: ['Ok']
        });
        alert.present();
    }
    change(event) {
        console.log(event);
        this.gender = event;
    }

}
