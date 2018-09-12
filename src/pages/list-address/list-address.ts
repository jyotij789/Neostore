import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
// import { ProvidersApiservice } from '../../providers/providers/apiservice'
// import { ProvidersUrl } from '../../providers/providers/url';
import { AddAddressPage } from '../add-address/add-address';
import { AlertController } from 'ionic-angular';
import { PaycardPage } from '../paycard/paycard';
@Component({
    selector: 'page-list-address',
    templateUrl: 'list-address.html',
})
export class ListAddressPage {
    public getSavedAddress: Array<{}>;
    public local_address: Array<{ status: number, address: string, landmark: string, city: string, state: string, zip_code: number, country: string }>;
    public address: string;
    public items: any;
    public pendingadd: any;
    constructor(public deleteAlert: AlertController, public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListAddressPage');
    }

    ionViewWillEnter() {
        let data = JSON.parse(localStorage.getItem('savedAddresses'));
        if (!data) {
            this.getSavedAddress;
        }
        else {
            this.pendingadd = data.filter(item => {
                return item.status == 0 || item.status == 2
            });
            this.getSavedAddress = this.pendingadd;
        }
    }

    addAddress(event: any) {
        this.navCtrl.push(AddAddressPage);
    }

    deleteAddress(value) {
        console.log("value", value);
        let alert = this.deleteAlert.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.local_address = JSON.parse(localStorage.getItem("savedAddresses"));
                        for (let i = 0; i < this.local_address.length; i++) {
                            this.items = this.local_address;
                            if (this.items[i].address == value) {
                                this.local_address[i].status = 1;
                            }
                        }
                        localStorage.setItem("savedAddresses", JSON.stringify(this.local_address));
                        this.ionViewWillEnter();
                    }
                }
            ]
        });
        alert.present();
    }
    placeOrder() {
        console.log(this.address);
        if (this.address == undefined || this.address == null) {
            this.providerglobal.alertMessage("Choose an Address", "Alert");
        }
        else {
            this.navCtrl.push(PaycardPage, { user_address: this.address });
        }
    }
    editAddress = (data) => {
        console.log("editAddress", data.address);
        this.local_address = JSON.parse(localStorage.getItem("savedAddresses"));
        for (let i = 0; i < this.local_address.length; i++) {
            this.items = this.local_address;
            if (this.items[i].address == data.address) {
                this.local_address[i].status = 2;
            }
        }
        localStorage.setItem("savedAddresses", JSON.stringify(this.local_address));
        this.ionViewWillEnter();
        this.navCtrl.push(AddAddressPage, { editAddress: data })
    }
}


