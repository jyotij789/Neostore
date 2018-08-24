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
    constructor(public Providers: ProvidersGlobal, public renderer: Renderer, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'mymodal', true);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddProductmodalPage');
        let data = this.navParams.get('data');
        this.product_data.push(data);
        console.log('product_data', this.product_data);
    }
    ondismiss() {
        if (this.quantity == null || this.quantity == undefined) {
            this.Providers.alertMessage("Enter quantity", "Error");
        } else {
            let data = {
                'quantity': this.quantity,
                'product_id': this.product_data[0].product_id
            }
            this.viewCtrl.dismiss(data);
            console.log("modal dismissed");

        }
    }
    close() {
        let close = "close";
        this.viewCtrl.dismiss(close);

    }

}
