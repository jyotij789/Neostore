import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-my-account',
    templateUrl: 'my-account.html',
})
export class MyAccountPage {
    public userFormattedData = [];
    public path: string;
    public userEdittedData: any;
    public email: string;
    public first_name: string;
    public last_name: string;
    public profile_pic: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyAccountPage');
        this.getUserdetails();

    }
    ionViewWillEnter() {
        console.log('ionViewwillEnter MyAccountPage');

    }
    getUserdetails() {

        let formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
        if (formattedData != null || formattedData != undefined) {
            this.userFormattedData.push(formattedData.user_data);
            console.log("userFormattedData myaccount", this.userFormattedData);
        }
        else {
            this.path = "../../assets/imgs/logo.png";
        }
    }
    editProfile() {
        this.navCtrl.push(EditProfilePage, { userFormattedData: this.userFormattedData });
    }

    resetPassword() {
        this.navCtrl.push(ResetPasswordPage);
    }
}
