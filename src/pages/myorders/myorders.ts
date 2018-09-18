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
    public orderslist: any = [];
    public orders: any = [];
    public order: any;
    public max: any;
    public isSearchBarOpen: any = false;

    constructor(public providerglobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
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
        this.providerglobal.stopLoader();
        console.log("ordersListCallback", response);
        let status = response.status;
        if (status == 200) {
            this.order = response.data;
            console.log('Object.keys(this.productlist).length', Object.keys(this.order).length);
            this.passOrder(7);
        }
        else if (status == 404 || status == 402) {
            this.providerglobal.alertMessage(response.user_msg, "Error");
        }
        else if (status == 0) {
            this.providerglobal.offlinealert();
        }
        else {
            this.providerglobal.alertMessage("Try again to load", "Error");
        }
    }


    passOrder(count) {
        let orderlength = Object.keys(this.order).length;
        this.orderslist = this.order.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        this.max = count;
        this.orders = [];
        if (this.max <= orderlength) {
            for (let i = 0; i < this.max; i++) {
                this.orders.push(this.orderslist[i]);
            }
            console.log("this.orders", this.orders);
            this.providerglobal.presentToast(this.max + " " + 'of' + " " + orderlength);
        }
    }
    getOrder(orderid) {
        this.navCtrl.push(OrderPage, { order_id: orderid });
    }

    loadMoreOrder(infiniteScroll) {
        setTimeout(() => {
            let c = (Object.keys(this.order).length - this.max);
            let count = c + this.max;
            this.passOrder(count);
            console.log('Async operation has ended');
            infiniteScroll.enable(false);
        }, 1000);
    }
    onInput(event: any) {
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

