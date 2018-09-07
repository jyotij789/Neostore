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
    public edit_status: number;
    public items: any;
    public local_address: Array<{ status: number, address: string, landmark: string, city: string, state: string, zip_code: string, country: string }>;
    constructor(public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddAddressPage');
        let editAddress = this.navParams.get("editAddress");
        console.log(editAddress);
        if (editAddress != null || editAddress != undefined) {
            this.address = editAddress.address;
            this.landmark = editAddress.landmark;
            this.city = editAddress.city;
            this.state = editAddress.state;
            this.zip_code = editAddress.zip_code;
            this.country = editAddress.country;
            this.edit_status = editAddress.status;
        }
    }

    saveAddress() {
        let addregex = /^\s*\S+(?:\s+\S+){2}/;
        let zip_coderegex = /^[0-9 ]{6,10}$/;
        let regex = /^[a-zA-Z ]{2,30}$/;
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
        else if (this.zip_code == null) {
            this.providerglobal.alertMessage("Enter zip_code", "Error");
        }
        else if (zip_coderegex.test(this.zip_code) == false) {
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
        if (this.edit_status != null || this.edit_status != undefined) {
            console.log("status is 2");
            this.local_address = JSON.parse(localStorage.getItem("savedAddresses"));

            for (let i = 0; i < this.local_address.length; i++) {
                this.items = this.local_address;
                if (this.items[i].status == 2) {
                    this.local_address[i].status = 0;
                    this.local_address[i].address = this.address;
                    this.local_address[i].landmark = this.landmark;
                    this.local_address[i].city = this.city;
                    this.local_address[i].state = this.state;
                    this.local_address[i].zip_code = this.zip_code;
                    this.local_address[i].country = this.country;
                }
            }
            localStorage.setItem("savedAddresses", JSON.stringify(this.local_address));
            this.navCtrl.pop();
        }
        else {
            console.log("status is 0");
            this.address_data = {
                status: 0,
                address: this.address,
                landmark: this.landmark,
                city: this.city,
                state: this.state,
                zip_code: this.zip_code,
                country: this.country
            };
            this.savedAddress.push(this.address_data);
            localStorage.setItem("savedAddresses", JSON.stringify(this.savedAddress));
            this.navCtrl.pop();
        }
    }
}
