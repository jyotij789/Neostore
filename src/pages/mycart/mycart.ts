import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { AlertController } from 'ionic-angular';
import { MyordersPage } from '../myorders/myorders';


@IonicPage()
@Component({
    selector: 'page-mycart',
    templateUrl: 'mycart.html',
})
export class MycartPage {
    public cartList = [];
    public total: number;
    public quant: number;
    constructor(public deleteAlert: AlertController, public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MycartPage');
        this.getproductCartitems();
    }

    getproductCartitems() {
        let data = null;
        let apitoken = "token";
        this.apiservice.globalApiRequest('get', this.providerUrl.listCartitem, data, apitoken, this.cartitemsCallback);

    }

    cartitemsCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("cartListCallback", response);
        return this.listCartitemCallback(response);

    }
    listCartitemCallback(response) {
        let status = response.status;
        console.log(response.data);
        if (status == 200 && response.data == null) {
            this.providerGlobal.alertMessage(response.message, "Success");
        }
        else if (status == 200 && response.data != null) {
            this.total = response.total;
            this.cartList = response.data;
            console.log("this.cartList", this.cartList);
        }
        else if (status == 402) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (status == 404) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }

    }

    removecartItem(item) {
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
                        console.log(item);
                        if (item != undefined || item != null) {
                            let data = { 'product_id': item.toString() };
                            let apitoken = "token";
                            this.apiservice.globalApiRequest('post', this.providerUrl.deleteCart, data, apitoken, this.deleteCartitemCallback);
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    deleteCartitemCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("deleteCartitemCallback", response);
        let status = response.status;
        if (status == 200 && response.data == true) {
            this.ionViewDidLoad();
        }
        else if (status == 401 || response.data == false) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (status == 402) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (status == 405) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else {
            this.providerGlobal.alertMessage("Try to load again", "Error");

        }
    }

    onSelectChange(quantity: number, productid: number) {
        console.log("onSelectChange", quantity);
        console.log("onSelectChange", productid);
        if (quantity != undefined || productid != undefined) {
            let data = {
                'product_id': productid,
                'quantity': quantity
            };
            let apitoken = "token";
            this.apiservice.globalApiRequest('post', this.providerUrl.editCart, data, apitoken, this.editCartCallback);

        }
    }
    editCartCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("editCartitemsCallback", response);
        return this.editCartitemCallback(response);

    }
    editCartitemCallback(response) {
        console.log(response.status);
        let status = response.status;
        if (status == 200 && response.data != null) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Success");
        }
        else if (status == 404) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (status == 500) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else {
            this.providerGlobal.alertMessage("Try again to load", "Error");
        }
    }
    addAddress(event: any) {
        let data = {
            'address': 'The Ruby, 29-Senapati Bapat Marg, Dadar (West)'
        };
        let apitoken = "token";
        this.apiservice.globalApiRequest('post', this.providerUrl.order, data, apitoken, this.orderCallback);
    }
    orderCallback = (response) => {
        this.providerGlobal.stopLoader();
        console.log("orderCallback", response);
        let status = response.status;
        if (status == 200) {
            this.navCtrl.push(MyordersPage);
        }
        else {
            this.providerGlobal.alertMessage("Try again", "Error");
        }
    }
}
