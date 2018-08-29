import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';

@Component({
    selector: 'page-add-address',
    templateUrl: 'add-address.html',
})
export class AddAddressPage {
    public address: any;
    public landmark: string;
    public city: string;
    public zip_code: string;
    public country: string;
    public state: string;
    public savedAddress: Array<{}>;
    public address_data: any;
    constructor(public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddAddressPage');
    }

    saveAddress() {
        let addregex = /^\s*\S+(?:\s+\S+){2}/;
        let zip_coderegex = /^[0-9]{6}$/;
        let regex = /^[a-zA-Z]{2,30}$/;
        if (this.address == null || this.address == "") {
            this.providerglobal.alertMessage("Enter address", "Error");
        }
        else if (!addregex.test(this.address)) {
            this.providerglobal.alertMessage("Enter address of 10-50 characters", "Error");
        }
        else if (this.landmark == null || this.landmark == "") {
            this.providerglobal.alertMessage("Enter landmark", "Error");
        }
        else if (!regex.test(this.landmark)) {
            this.providerglobal.alertMessage("Enter landmark of 2-30 characters", "Error");
        }
        else if (this.city == null || this.city == "") {
            this.providerglobal.alertMessage("Enter city", "Error");
        }
        else if (!regex.test(this.city)) {
            this.providerglobal.alertMessage("Enter city of 2-30 characters", "Error");
        }
        else if (this.state == null) {
            this.providerglobal.alertMessage("Enter state", "Error");
        }
        else if (!regex.test(this.state)) {
            this.providerglobal.alertMessage("Enter state of 2-30 characters", "Error");
        }
        else if (this.zip_code == null || this.zip_code == "") {
            this.providerglobal.alertMessage("Enter zip_code", "Error");
        }
        else if (!zip_coderegex.test(this.zip_code)) {
            this.providerglobal.alertMessage("zip_code must be between of 6 digits", "Error");
        }
        else if (this.country == null || this.country == "") {
            this.providerglobal.alertMessage("Enter country", "Error");
        }
        else if (!regex.test(this.country)) {
            this.providerglobal.alertMessage("Enter country of 2-30 characters", "Error");
        }
        else {
            this.storeAddress();
        }

    }
    ionViewWillEnter() {
        this.savedAddress = JSON.parse(localStorage.getItem("savedAddresses"));
        if (!this.savedAddress) {
            this.savedAddress = [];
        }
    }
    storeAddress() {
        this.address_data = {
            status: 0,
            address: this.address,
            landmark: this.landmark,
            city: this.city,
            state: this.state,
            zip_code: this.zip_code,
            country: this.country
        };
        console.log("this.address_data", this.address_data);
        this.savedAddress.push(this.address_data);
        console.log("savedAddress", this.savedAddress);
        localStorage.setItem("savedAddresses", JSON.stringify(this.savedAddress));
        this.navCtrl.pop();
    }
}
