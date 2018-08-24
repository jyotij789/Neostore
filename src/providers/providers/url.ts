import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProvidersUrl {
    public baseUrl: 'http://staging.php-dev.in:8844/trainingapp/api';
    getBaseUrl() {
        return 'http://staging.php-dev.in:8844/trainingapp/api';
    }

    constructor(public http: HTTP) {
        console.log('Hello ProvidersUrl Provider');
    }

    public login = this.getBaseUrl() + '/users/login';
    public register = this.getBaseUrl() + '/users/register';
    public forgotpass = this.getBaseUrl() + '/users/forgot';
    public changepass = this.getBaseUrl() + '/users/change';
    public updateaccount = this.getBaseUrl() + '/users/update';
    public Fetchaccount = this.getBaseUrl() + '/users/getUserData';

    public getlist = this.getBaseUrl() + '/products/getList';
    public getDetail = this.getBaseUrl() + '/products/getDetail';
    public setRating = this.getBaseUrl() + '/products/setRating';


    public addToCart = this.getBaseUrl() + '/addToCart';
    // editCart: this.baseUrl + '/editCart';
    // deleteCart: this.baseUrl + '/deleteCart';
    // listCartitem: this.baseUrl + '/cart';

    // order: this.baseUrl + '/order';
    // orderList: this.baseUrl + '/orderList';
    // orderDetail: this.baseUrl + '/orderDetail';

}
