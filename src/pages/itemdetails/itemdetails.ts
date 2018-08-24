import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ModalOptions } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddProductmodalPage } from '../add-productmodal/add-productmodal'
import { RatingProductmodalPage } from '../rating-productmodal/rating-productmodal'

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
    public ratings: number;
    constructor(public Sharing: SocialSharing, public ProvidersGlobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public modalCtrl: ModalController, public navParams: NavParams) {
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
            console.log("this.productDetails", this.productDetails);
            this.productimages = response.data.product_images;
            this.setProductImage = this.productimages[0].image;
            this.ratings = response.data.rating;
            console.log(this.ratings);
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
        this.setProductImage = data;
    }

    regularShare(name, description) {
        this.Sharing.share(name, description, null, null);
    }

    openAddProductModal(name) {
        const myModalOptions: ModalOptions = {
            showBackdrop: true,
            enableBackdropDismiss: true,
            cssClass: "mymodal"
        };
        const myModalData = {
            'product_name': name,
            'product_image': this.setProductImage,
            'product_id': this.product_id
        };
        const productmodal = this.modalCtrl.create(AddProductmodalPage, { data: myModalData }, myModalOptions);
        productmodal.present();
        productmodal.onDidDismiss(data => {
            console.log("productmodal", data);
        });
    }
    openRatingProductModal(name) {
        console.log("name", name);
        const myModalOptions: ModalOptions = {
            showBackdrop: true,
            enableBackdropDismiss: true,
            cssClass: "mymodal"
        };
        const myModalDatarating = {
            'product_name': name,
            'product_image': this.setProductImage,
            'product_id': this.product_id,
            'product_rating': this.ratings
        };
        console.log("myModalData", myModalDatarating);
        const productmodal = this.modalCtrl.create(RatingProductmodalPage, { ratingdata: myModalDatarating }, myModalOptions);
        productmodal.present();
        // productmodal.onDidDismiss(data => {
        //     console.log("productmodal", data);
        // });

    }
}


