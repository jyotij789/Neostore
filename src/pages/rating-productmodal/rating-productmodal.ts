import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-rating-productmodal',
    templateUrl: 'rating-productmodal.html',
})
export class RatingProductmodalPage {
    public rating_data = [];
    constructor(public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RatingProductmodalPage');
        let ratings = this.navParams.get('ratingdata');
        this.rating_data.push(ratings);
        console.log('rating_data', this.rating_data);
    }
    ondismiss() {
        let data = { 'product_id': this.rating_data[0].product_id };
        this.viewCtrl.dismiss(data);
        console.log("modal dismissed");
    }
    close() {
        let close = "close";
        this.viewCtrl.dismiss(close);
    }
}
