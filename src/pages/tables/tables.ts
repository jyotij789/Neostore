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
    public isSearchBarOpen: any = false;
    constructor(public providerglobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
        this.category_id = this.navParams.get('product_category_id');
        this.category_name = this.navParams.get('category_name');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TablesPage');
        this.isSearchBarOpen = false;
        this.getApiHit();
    }
    getApiHit(infiniteScroll?) {
        let data = { 'product_category_id': this.category_id.toString(), 'limit': this.limit.toString(), 'page': this.page.toString() };
        let token = "";
        this.apiservice.globalApiRequest('get', this.providerUrl.getlist, data, token, this.categoryListcallback);
    }
    categoryListcallback = (response) => {
        this.providerglobal.stopLoader();
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
            this.providerglobal.presentToast(products + " " + 'of' + " " + products);
        }
        else if (status == 401 || status == 400 || status == 404) {
            this.providerglobal.alertMessage("Data missing", "Error");
        }
        else if (status == 0) {
            this.providerglobal.offlinealert();
        }

    }
    loadMore(infiniteScroll) {
        setTimeout(() => {
            this.page++;
            this.getApiHit(infiniteScroll);

            console.log('Async operation has ended');
            infiniteScroll.enable(false);
        }, 500);
    }


    public openItemDetails = (product, productcategoryid) => {
        let product_id = product;
        let product_category_id = productcategoryid;
        console.log("this.product_id", product_category_id);
        if (product_category_id == 1) {
            this.category_name = "Tables";
        }
        else if (product_category_id == 2) {
            this.category_name = "Sofa";

        }
        else if (product_category_id == 3) {
            this.category_name = "Chair";

        }
        else {
            this.category_name = "Cupboard";

        }
        this.navCtrl.push(ItemdetailsPage, { product_id: product_id, product_category_name: this.category_name });
    }

    //search item using order id
    onInput(event: any) {
        console.log("ssss");
        // Reset items back to all of the items
        this.productlist;

        // set val to the value of the searchbar
        const val = event.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.productlist = this.productlist.filter((item) => {
                console.log(item.name);
                return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            })
        }
    }
}
