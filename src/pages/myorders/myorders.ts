import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { OrderPage } from '../order/order';
@IonicPage()
@Component({
    selector: 'page-myorders',
    templateUrl: 'myorders.html',
})
export class MyordersPage {
    public orders: any = [];
    public isSearchBarOpen: any = false;

    constructor(public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyordersPage');
        this.isSearchBarOpen = false;
        let data = null;
        let apitoken = "token";
        this.apiservice.globalApiRequest('get', this.providerUrl.orderList, data, apitoken, this.ordersListCallback);
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter MyordersPage');
    }
    ordersListCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("ordersListCallback", response);
        let status = response.status;
        if (status == 200) {
            this.orders = response.data;
            console.log("this.orders", this.orders);
        }
        else if (status == 404 || status == 402) {
            this.providerGlobal.alertMessage(response.user_msg, "Error");
        }
        else if (status == 0) {
            this.providerGlobal.alertMessage(response.error, "Error");
        }
        else {
            this.providerGlobal.alertMessage("Try again to load", "Error");
        }
    }
    getOrder(orderid) {
        this.navCtrl.push(OrderPage, { order_id: orderid });
    }
    onInput(event: any) {
        console.log("ssss");
        // Reset items back to all of the items
        this.orders;

        // set val to the value of the searchbar
        const val = event.target.value;
        console.log("val", val);

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.orders = this.orders.filter((item) => {
                console.log(String(item.id).startsWith(val));
                return String(item.id).startsWith(val);
            })
        }
    }
}

