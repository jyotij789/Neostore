import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TablesPage } from '../tables/tables';
// import { LoginPage } from '../login/login';
// import { MyApp } from '../../app/app.component';
// import { ProvidersGlobal } from '../../providers/providers/global';
// import { ProvidersApiservice } from '../../providers/providers/apiservice'
// import { ProvidersUrl } from '../../providers/providers/url';


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
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
        this.getUserDetails();

    }

    getUserDetails() {
        console.log("User account details", this.navParams.get('homeData'));
        // console.log(JSON.stringify(this.imagesArray));
        this.formattedData = this.navParams.get('homeData');
        this.imagesArray = this.formattedData.product_categories;
        // console.log(JSON.stringify(this.imagesArray));
        // console.log(formattedData.product_categories[0].icon_image);
    }

    openTablesPage() {
        this.navCtrl.push(TablesPage);
    }

}
