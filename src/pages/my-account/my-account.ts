import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyAccountPage');
        this.getUserdetails();
    }
    getUserdetails() {
        let formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
        console.log(formattedData);
        this.userFormattedData.push(formattedData.user_data);
        console.log("userFormattedData myaccount", this.userFormattedData);
        // let image=this.userFormattedData.profile_pic;
    }
    editProfile() {
        this.navCtrl.push(EditProfilePage, { userFormattedData: this.userFormattedData });
    }

    resetPassword() {
        this.navCtrl.push(ResetPasswordPage);
    }
}
