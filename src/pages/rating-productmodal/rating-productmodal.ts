import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-rating-productmodal',
    templateUrl: 'rating-productmodal.html',
})
export class RatingProductmodalPage {
    public rating_data = [];
    public ratings: any;
    constructor(public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RatingProductmodalPage');
        this.ratings = this.navParams.get('ratingdata');
        this.rating_data.push(this.ratings);
    }
    ondismiss() {
        let data = { 'product_id': this.rating_data[0].product_id };
        this.viewCtrl.dismiss(data);
    }
    close() {
        let close = "close";
        this.viewCtrl.dismiss(close);
    }
    onRatingChange(data: number) {
        let score = data + 1;
        this.ratings.product_rating = score;
    }
}
