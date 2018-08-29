import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { AddAddressPage } from '../add-address/add-address';
import { MyordersPage } from '../myorders/myorders';
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
    constructor(public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListAddressPage');
    }

    ionViewWillEnter() {
        let data = JSON.parse(localStorage.getItem('savedAddresses'));
        // this.getSavedAddress = [];
        if (!data) {
            this.getSavedAddress;
        }
        else {
        this.pendingadd = data.filter(item => {
            return item.status == 0
        });
            this.getSavedAddress = this.pendingadd;
        }
    }

    addAddress(event: any) {
        this.navCtrl.push(AddAddressPage);
    }

    deleteAddress(value) {
        console.log("value", value);
        this.local_address = JSON.parse(localStorage.getItem("savedAddresses"));
        for (let i = 0; i < this.local_address.length; i++) {
            this.items = this.local_address;
            console.log("this.items", this.items[i].address);
            if (this.items[i].address == value) {
                console.log(this.local_address[i].status);
                this.local_address[i].status = 1;
            }
        }
        localStorage.setItem("savedAddresses", JSON.stringify(this.local_address));
        this.ionViewWillEnter();
    }
    placeOrder() {
        console.log(this.address);
        if (this.address == undefined || this.address == null) {
            this.providerglobal.alertMessage("Choose an Address", "Alert");
        }
        else {
            let data = {
                'address': this.address
            };
            let apitoken = "token";
            this.apiservice.globalApiRequest('post', this.providerUrl.order, data, apitoken, this.orderCallback);
        }
    }

    orderCallback = (response) => {
        this.providerglobal.stopLoader();
        console.log("orderCallback", response);
        let status = response.status;
        if (status == 200) {
            this.navCtrl.push(MyordersPage);
        }
        else {
            this.providerglobal.alertMessage("Try again", "Error");
        }
    }

}


