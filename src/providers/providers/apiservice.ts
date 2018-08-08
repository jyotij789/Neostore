import { Injectable, ViewChild } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { LoadingController, AlertController, Header } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ProvidersUrl } from '../providers/url';
import { HomePage } from '../../pages/home/home';
import { ProvidersGlobal } from '../../providers/providers/global';
import { Platform, IonicPage, Nav, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
@Injectable()
export class ProvidersApiservice {
    @ViewChild(Nav) nav: Nav;
    constructor(public HTTP: HTTP, public http: Http, public platformGlobal: ProvidersGlobal) {
        console.log('Hello ProvidersProvider Provider');
        // if (this.platform.is('cordova')) {
        //     // You're on a device, call the native plugins.
        // } else {
        //     // You're testing in browser, do nothing or mock the plugins' behaviour.
        // }
    }

    // 
    globalApiRequest(method, url, data, callback) {
        console.log(data);
        // let headers = new Headers(data);
        // console.log(headers);
        // let options = new RequestOptions({ headers: headers });
        let platform = this.platformGlobal.platformDetect();
        console.log("platform", platform);
        if (platform == "other") {
            if (method == 'get') {
                this.HTTP.get(url, data, {})
                    .then(data => {
                        console.log("GlobalpostwithHeader_service success", data);
                        return callback(data);
                    })
                    .catch(error => {
                        console.log("GlobalpostwithHeader_service error", error);
                        return callback(error);

                    });

            }
            else {
                console.log("post");
                console.log(url);
                console.log(data);
                this.HTTP.post(url, { email: "aaaa99@gmail.com", password: "aaaa123" }, {})
                    .then(data => {
                        console.log("GlobalpostwithHeader_service success", data);
                        // return callback(data);

                    })
                    .catch(error => {
                        console.log("GlobalpostwithHeader_service error", error);
                        // return callback(error);

                    });
            }
        }

        else {
            if (method == 'get') {
                return new Promise((resolve, reject) => {
                    this.http.get(url, data)
                        .subscribe(data => {
                            console.log("GlobalpostwithHeader_service success", data);
                            return callback(data);
                        },
                            error => {
                                console.log("GlobalpostwithHeader_service error", error);
                                return callback(error);

                            });
                })
            }
            else {
                console.log("post");
                console.log(url);
                console.log(data);
                return new Promise((resolve, reject) => {
                    this.http.post(url, data)
                        .subscribe(data => {
                            console.log("GlobalpostwithHeader_service success", data);
                            return callback(data);

                        },
                            error => {
                                console.log("GlobalpostwithHeader_service error", error);
                                return callback(error);

                            });
                });
            }
        }
    }
}

