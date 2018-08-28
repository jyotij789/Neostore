import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TablesPage } from '../tables/tables';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public i: number;
    public imagesArray = [];
    public TitleArray: Array<{}>;
    public titles: any;
    public formattedData;
    public userFormattedData = [];
    public carts: number;

    constructor(public events: Events, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
        this.getUserDetails();

    }
    ionViewWillEnter() {
        let formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
        // this.userFormattedData.push(formattedData.user_data);
        this.carts = formattedData.total_carts;
        console.log("this.carts", this.carts);
        this.events.publish('cart:created', this.carts);
    }
    getUserDetails() {
        console.log("User account details", this.navParams.get('homeData'));
        this.formattedData = this.navParams.get('homeData');
        this.imagesArray = this.formattedData.product_categories;
        // console.log(JSON.stringify(this.imagesArray));
        // console.log((<any>Object).values(this.imagesArray));
        // console.log(formattedData.product_categories[0].icon_image);
    }

    openTablesPage() {
        this.navCtrl.push(TablesPage, { product_category_id: 1, category_name: 'Table' });

    }
    openSofaPage() {
        this.navCtrl.push(TablesPage, { product_category_id: 3, category_name: 'Sofa' });

    }
    openChairPage() {
        this.navCtrl.push(TablesPage, { product_category_id: 2, category_name: 'Chair' });

    }
    openCupboardPage() {
        this.navCtrl.push(TablesPage, { product_category_id: 4, category_name: 'Cupboard' });

    }

}
