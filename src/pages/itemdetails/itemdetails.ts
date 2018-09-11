import { Component } from '@angular/core';
import { Events, IonicPage, NavController, AlertController, ModalController, NavParams, ModalOptions } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddProductmodalPage } from '../add-productmodal/add-productmodal'
import { RatingProductmodalPage } from '../rating-productmodal/rating-productmodal'
import { MycartPage } from '../../pages/mycart/mycart';

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
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public events: Events, public Sharing: SocialSharing, public providerglobal: ProvidersGlobal, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public modalCtrl: ModalController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ItemdetailsPage');
        this.product_id = this.navParams.get('product_id');
        this.ProductDetailsApi();
    }
    ProductDetailsApi() {
        let data = { 'product_id': this.product_id.toString() };
        let token = "";
        this.apiservice.globalApiRequest('get', this.providerUrl.getDetail, data, token, this.productDetailscallback);
    }
    productDetailscallback = (response) => {
        this.providerglobal.stopLoader();
        let status = response.status;
        console.log("productDetailscallback", response);
        if (status == 200) {
            this.category_name = this.navParams.get('product_category_name');
            this.productDetails.push(response.data);
            this.productimages = response.data.product_images;
            this.setProductImage = this.productimages[0].image;
            this.ratings = response.data.rating;
        }
        else if (status == 402 || status == 500) {
            this.providerglobal.alertMessage("Invalid Access Token", "Error");
        }
        else {
            this.providerglobal.alertMessage("Something is Wrong.", "Error");
        }
    }

    setImage = (data) => {
        this.setProductImage = data;
    }

    regularShare(name, description) {
        this.Sharing.share(name, description, null, null);
    }

    // Code for buy product model
    openAddProductModal(name) {
        const myModalOptions: ModalOptions = {
            showBackdrop: true,
            enableBackdropDismiss: true,
            // cssClass: "mymodal"
        };
        const myModalData = {
            'product_name': name,
            'product_image': this.setProductImage,
            'product_id': this.product_id
        };
        const productmodal = this.modalCtrl.create(AddProductmodalPage, { data: myModalData }, myModalOptions);
        productmodal.onDidDismiss(params => {
            console.log("productmodal", params);
            if (params == "close") {
                console.log("close modal");
            } else {
                let token = "token";
                this.apiservice.globalApiRequest('post', this.providerUrl.addToCart, params, token, this.buyProductModalCallback);

            }
        });
        productmodal.present();
    }

    buyProductModalCallback = (response) => {
        console.log("addProductModalCallback", response);
        this.providerglobal.stopLoader();
        let status = response.status;
        if (status == 200) {
            let carts = response.total_carts;
            this.events.publish('cart:created', carts);
            this.gotoCart();
        }
        else if (status == 401 || status == 402 || status == 405) {
            this.providerglobal.alertMessage(response.user_msg, "Error");
        }
        else if (status == 0) {
            this.providerglobal.alertMessage(response.error, "Error");
        }
    }

    // Code for Rating model
    openRatingProductModal(name) {
        const myModalOptions: ModalOptions = {
            showBackdrop: true,
            enableBackdropDismiss: true,
            // cssClass: "mymodal"
        };
        const myModalDatarating = {
            'product_name': name,
            'product_image': this.setProductImage,
            'product_id': this.product_id,
            'product_rating': this.ratings
        };
        const productmodal = this.modalCtrl.create(RatingProductmodalPage, { ratingdata: myModalDatarating }, myModalOptions);
        productmodal.present();
        productmodal.onDidDismiss(params => {
            if (params == "close") {
            }
            else {
                let token = "token";
                this.apiservice.globalApiRequest('post', this.providerUrl.setRating, params, token, this.RatingModalCallback);
            }
        });

    }
    RatingModalCallback = (response) => {
        console.log("ratingModalCallback", response);
        this.providerglobal.stopLoader();
        let status = response.status;
        if (status == 200) {
            this.providerglobal.alertMessage(response.message + response.user_msg, "Success");
        }
        else if (status == 400 || status == 401 || status == 405) {
            this.providerglobal.alertMessage(response.user_msg, "Error");
        }
        else if (status == 0) {
            this.providerglobal.offlinealert();
        }
    }

    gotoCart() {
        let alert = this.alertCtrl.create({
            title: 'Added Product into cart',
            message: 'Do you want to go to Cart?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                    }
                },
                {
                    text: 'Go to Cart',
                    handler: () => {
                        this.navCtrl.push(MycartPage);
                    }
                }
            ]
        });
        alert.present();
    }

}


