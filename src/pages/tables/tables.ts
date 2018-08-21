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
        let data = { 'product_category_id': this.category_id.toString(), 'limit': this.limit.toString(), 'page': this.page.toString() };
        let token = "";
        this.apiservice.globalApiRequest('get', this.providerUrl.getlist, data, token, this.categoryListcallback);
    }
    categoryListcallback = (response) => {
        console.log("tables page", response);
        let formattedData = response;
        let status = formattedData.status;
        let data = formattedData.data;
        return this.getProductList(status, data);

    }
    public getProductList(status, data) {
        console.log("tables page productliststatus", status);
        if (status == 200) {
            this.productlist = this.productlist.concat(data);
            console.log('Object.keys(this.productlist).length', Object.keys(this.productlist).length);
            let products = Object.keys(this.productlist).length;
            this.platformGlobal.presentToast(products + " " + 'of' + " " + products);
        }
        else if (status == 401) {
            this.platformGlobal.alertMessage("Invalid product category id.", "Error");
        }
        else if (status == 400) {
            this.platformGlobal.alertMessage("Product category id missing.", "Error");
        }
        else if (status == 404) {
            this.platformGlobal.alertMessage("Method has to be get.", "Error");
        }
        else {
            this.platformGlobal.alertMessage("Something is wrong.", "Error");

        }
    }
    loadMore(infiniteScroll) {

        this.page++;
        this.limit += 1;
        this.getApiHit(infiniteScroll);

    }

    openItemDetails() {
        this.navCtrl.push(ItemdetailsPage, { productDetails: this.productlist });
    }
}
