import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemdetailsPage } from '../itemdetails/itemdetails';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { ProvidersGlobal } from '../../providers/providers/global';

@IonicPage()
@Component({
    selector: 'page-tables',
    templateUrl: 'tables.html',
})
export class TablesPage {
    public category_id: number;
    public category_name: string;
    public productlist = [];
    public page: number = 1;
    public limit: number = 7;
    public maximumPages: number = 2;
    public infiniteScrollvar: any;
    public demo: any;
    constructor(public platformGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
        this.category_id = this.navParams.get('product_category_id');
        this.category_name = this.navParams.get('category_name');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TablesPage');
        this.getApiHit();
    }
    getApiHit(infiniteScroll?) {
        let data = { 'product_category_id': this.category_id, 'limit': this.limit, 'page': this.page };
        let token = "token";
        this.apiservice.globalApiRequest('get', this.providerUrl.getlist, data, token, this.categoryListcallback);
    }
    categoryListcallback = (response) => {
        this.productlist = this.productlist.concat(response);
        console.log('Object.keys(this.productlist).length', Object.keys(this.productlist).length);
        let products = Object.keys(this.productlist).length;
        this.platformGlobal.presentToast(products + " " + 'of' + " " + products);
        // if (Object.keys(this.productlist).length < 12) {
        //     this.loadMore(this.demo);
        // }
    }
    loadMore(infiniteScroll) {
        // this.demo = infiniteScroll;
        // if (Object.keys(this.productlist).length < 12) {
        this.page++;
        this.limit += 1;
        this.getApiHit(infiniteScroll);
        // }
        // else {
        //     console.log("scroll end");
        //     infiniteScroll.enable(false);
        // }

    }

    openItemDetails() {
        this.navCtrl.push(ItemdetailsPage, { productDetails: this.productlist });
    }
}
