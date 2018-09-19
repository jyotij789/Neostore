import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { TablesPage } from '../tables/tables';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { ProvidersGlobal } from '../../providers/providers/global';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public i: number;
    public imagesArray = [];
    public TitleArray: Array<{}>;
    public titles: any;
    public accessToken: any;
    public formattedData;
    public userFormattedData = [];
    public carts: number;

    constructor(public providerglobal: ProvidersGlobal, public events: Events, public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
        // this.getuserdata();
    }
    ionViewWillEnter() {
        console.log('ionViewWillEnter HomePage');
        this.accessToken = JSON.parse(localStorage.getItem("formattedResponse"));
        let data = null;
        let apitoken = this.accessToken;
        this.apiservice.globalApiRequest('get', this.providerUrl.Fetchaccount, data, apitoken, this.homepageCallback);
    }
    homepageCallback = (response) => {
        this.providerglobal.stopLoader();
        let status = response.status;
        return this.getUserData(status, response);

    }
    public getUserData(status, response) {
        console.log("login getUserstatus", status);
        console.log("device/browser homepageCallback response", response);
        if (status == 200) {
            let data = response.data;
            localStorage.setItem("User_Account_Details", JSON.stringify(data));
            this.formattedData = JSON.parse(localStorage.getItem("User_Account_Details"));
            if (this.formattedData != null || this.formattedData != undefined) {
                this.imagesArray = this.formattedData.product_categories;
                this.events.publish('user:created', this.formattedData);
            }
        }
        else if (status == 402 || status == 500 || status == 404) {
            this.providerglobal.alertMessage(response.message, "Error");
        }
        else if (status == 0) {
            this.providerglobal.offlinealert();
        }
        else {
            this.providerglobal.alertMessage("Try to load again.", "Error");

        }
    }

    openTablesPage(id, name) {
        this.navCtrl.push(TablesPage, { product_category_id: id, category_name: name });

    }

}
