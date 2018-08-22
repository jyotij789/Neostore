import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';

@IonicPage()
@Component({
    selector: 'page-itemdetails',
    templateUrl: 'itemdetails.html',
})
export class ItemdetailsPage {
    public array = [];
    public productDetails = [];
    public productimages = [];
    public product_id: number;
    public category_name: string
    public setProductImage: string;
    constructor(public ProvidersGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemdetailsPage');
        this.product_id = this.navParams.get('product_id');
        this.ProductDetailsApi();
    }
    // public getdata = (data) => {
    //     this.array = data;
    //     this.resultArray = this.array.map(function (a) { return a["id"]; });
    //     console.log("this.resultArray", this.resultArray);

    // }
    ProductDetailsApi() {
        let data = { 'product_id': this.product_id.toString() };
        let token = "";
        this.apiservice.globalApiRequest('get', this.providerUrl.getDetail, data, token, this.productDetailscallback);
    }
    productDetailscallback = (response) => {
        this.ProvidersGlobal.stopLoader();
        let status = response.status;
        console.log("productDetailscallback", response);
        return this.getProductDetails(status, response);

    }
    getProductDetails(status, response) {
        console.log("itemdetails getUserstatus", status);
        if (status == 200) {
            this.category_name = this.navParams.get('product_category_name');
            this.productDetails.push(response.data);
            console.log("this.productDetails", response.data.product_images);
            this.productimages = response.data.product_images;
            console.log("this.productimages", this.productimages);
        }
        else if (status == 402) {
            this.ProvidersGlobal.alertMessage("Invalid Access Token", "Error");
        }
        else if (status == 500) {
            this.ProvidersGlobal.alertMessage("Could not update Account details.", "Error");
        }
        else {
            this.ProvidersGlobal.alertMessage("Something is Wrong.", "Error");
        }
    }
    setImage = (data) => {
        console.log("image", data);
        this.setProductImage = data;
    }

}


