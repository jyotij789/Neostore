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
    constructor(public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
        this.category_id = this.navParams.get('product_category_id');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TablesPage');
        this.getApiHit();
    }
    getApiHit(infiniteScroll?) {
        let data = { 'product_category_id': this.category_id, 'limit': this.limit, 'page': this.page };
        let token = null;
        this.apiservice.globalApiRequest('get', this.providerUrl.getlist, data, token, this.categoryListcallback);
    }
    categoryListcallback = (response) => {
        this.category_name = this.navParams.get('category_name');
        console.log('category', this.productlist);
        this.productlist = this.productlist.concat(response);

    }
    loadMore(infiniteScroll) {

        console.log('Object.keys(this.productlist).length', Object.keys(this.productlist).length);
        if (Object.keys(this.productlist).length < 12) {
            this.page++;
            this.limit += 1;
            this.getApiHit(infiniteScroll);

        }
        else {
            console.log('Object.keys(this.productlist).length', Object.keys(this.productlist).length);
            infiniteScroll.enable(false);
        }
        // if (this.page === this.maximumPages) {
        //     infiniteScroll.enable(false);
        // }
    }
    openItemDetails() {
        this.navCtrl.push(ItemdetailsPage, { productDetails: this.productlist });
    }
}
