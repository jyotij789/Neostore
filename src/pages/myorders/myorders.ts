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
    constructor(public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyordersPage');

    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter MyordersPage');
        let data = null;
        let apitoken = "token";
        this.apiservice.globalApiRequest('get', this.providerUrl.orderList, data, apitoken, this.ordersListCallback);

    }
    ordersListCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("ordersListCallback", response);
        let status = response.status;
        if (status == 200) {
            this.orders = response.data;
            console.log("this.orders", this.orders);
        }
        else if (status == 404) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (status == 402) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else {
            this.providerGlobal.alertMessage("Try again to load", "Error");
        }
    }
    getOrder(orderid) {
        this.navCtrl.push(OrderPage, { order_id: orderid });
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter MyordersPage');

    }
    ionViewwillLeave() {
        console.log('ionViewwillLeave MyordersPage');
    }
    ionViewDidLeave() {
        console.log('ionViewDidLeave MyordersPage');
    }
    ionViewwillUnload() {
        console.log('ionViewwillUnload MyordersPage');
    }
}

