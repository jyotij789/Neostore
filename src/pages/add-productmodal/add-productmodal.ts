import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
@Component({
    selector: 'page-add-productmodal',
    templateUrl: 'add-productmodal.html',
})
export class AddProductmodalPage {
    public name: string;
    public product_data = [];
    public quantity: number;
    constructor(public Providers: ProvidersGlobal, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddProductmodalPage');
        let data = this.navParams.get('data');
        this.product_data.push(data);
    }
    ondismiss() {
        if (this.quantity == null || this.quantity == undefined) {
            this.Providers.alertMessage("Enter quantity", "Error");
        }
        else if (this.quantity > 8) {
            this.Providers.alertMessage("Quantity must be 1 to 8", "Error");
        }
        else if (isNaN(this.quantity)) {
            this.Providers.alertMessage("Quantity must be in numbers Only", "Error");

        }
        else {
            let data = {
                'quantity': this.quantity,
                'product_id': this.product_data[0].product_id
            }
            this.viewCtrl.dismiss(data);
        }
    }
    close() {
        let close = "close";
        this.viewCtrl.dismiss(close);

    }

}
