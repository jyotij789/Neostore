import { Injectable } from '@angular/core';

@Injectable()
export class ProvidersUrl {
    public baseUrl: 'http://staging.php-dev.in:8844/trainingapp/api';
    getBaseUrl() {
        return 'http://staging.php-dev.in:8844/trainingapp/api';
    }

    constructor() {
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
    public editCart = this.getBaseUrl() + '/editCart';
    public deleteCart = this.getBaseUrl() + '/deleteCart';
    public listCartitem = this.getBaseUrl() + '/cart';

    public order = this.getBaseUrl() + '/order';
    public orderList = this.getBaseUrl() + '/orderList';
    public orderDetail = this.getBaseUrl() + '/orderDetail';

}
