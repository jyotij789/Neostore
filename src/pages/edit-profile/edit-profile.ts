import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';



@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    public email: string;
    public phnumber: string;
    public dob: Date;
    public userFormattedData = [];
    constructor(public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
        this.userFormattedData = this.navParams.get('userFormattedData');
    }
    submitprofile() {
        let regex = /^[a-zA-Z]{2,30}$/;
        let phoneregex = /^[0-9#*+]{10,12}$/;
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

        if (this.email == null || this.email == "" || !emailregex.test(this.email)) {
            return this.providerglobal.alertMessage("Enter Valid Email", "Error");
        }

        else if (this.phnumber == null || this.phnumber == "") {
            return this.providerglobal.alertMessage("Enter Phone Number", "Error");
        }
        else if (!phoneregex.test(this.phnumber)) {
            return this.providerglobal.alertMessage("Phone number must be between of 10-12 digits", "Error");
        }

        else if (this.dob == null) {
            return this.providerglobal.alertMessage("Enter DOB", "Error");
        }
        else {

        }
    }

}
