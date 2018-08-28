import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';

@IonicPage()
@Component({
    selector: 'page-order',
    templateUrl: 'order.html',
})
export class OrderPage {
    public orderId: number;
    total_cost: number;
    public order = [];
    constructor(public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderPage');
        console.log(this.navParams.get('order_id'));
        this.orderId = this.navParams.get('order_id');
    }
    ionViewWillEnter() {
        console.log('ionViewWillEnter MyordersPage');
        let data = {
            'order_id': this.orderId.toString()
        };
        let apitoken = "token";
        this.apiservice.globalApiRequest('get', this.providerUrl.orderDetail, data, apitoken, this.orderCallback);

    }
    orderCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("ordersListCallback", response);
        let status = response.status;
        if (status == 200) {
            this.order = response.data.order_details;
            console.log("this.order", this.order);
            this.total_cost = response.data.cost;
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
}
