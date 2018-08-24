import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-rating-productmodal',
    templateUrl: 'rating-productmodal.html',
})
export class RatingProductmodalPage {
    public rating_data = [];
    constructor(public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'mymodal', true);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RatingProductmodalPage');
        let ratings = this.navParams.get('ratingdata');
        this.rating_data.push(ratings);
        console.log('rating_data', this.rating_data);
    }
    ondismiss() {
        this.viewCtrl.dismiss();
        console.log("modal dismissed");
    }
}
