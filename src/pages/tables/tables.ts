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
    constructor(public providerGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
        this.category_id = this.navParams.get('product_category_id');
        console.log('this.category_id', this.category_id);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TablesPage');
        let data = this.category_id;
        let token = null;
        this.apiservice.globalApiRequest('get', this.providerUrl.getlist, data, token, this.categoryListcallback)

    }
    categoryListcallback = (response) => {
        this.productlist = response;
        this.category_name = this.navParams.get('category_name');
        console.log('category', this.category_name);

    }
    openItemDetails() {
        this.navCtrl.push(ItemdetailsPage, { productDetails: this.productlist });
    }
}
