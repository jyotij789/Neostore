import { Injectable, ViewChild } from '@angular/core';
// import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    public i: number;
    public name: any;

    @ViewChild(Nav) nav: Nav;
    constructor(public HTTP: HTTP, public http: Http, public platformGlobal: ProvidersGlobal) {
        console.log('Hello ProvidersProvider Provider');

    }

    // 
    globalApiRequest(method, url, data, callback) {
        console.log(data);

        // let name = Object.keys(data)[0];
        // let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
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
                console.log(typeof (data));
                console.log(this.HTTP.getDataSerializer());
                this.HTTP.setDataSerializer("urlencoded");
                this.HTTP.post(url, data, {})
                    .then(data => {
                        console.log("GlobalpostwithHeader_service success", data);
                        return callback(data);

                    })
                    .catch(error => {
                        console.log("GlobalpostwithHeader_service error", error);
                        return callback(error);

                    });
            }
        }

        else {

            if (method == 'get') {
                //let headers = new HttpHeaders().set('access_token', data);
                // headers.append('access_token', data);
                // headers.append('Content-Type', 'application/json');
                // const params = new HttpParams().set('access_token', data)
                // console.log("authheaders", data);
                console.log(typeof (data));
                // const header = new HttpHeaders({
                //     'access_token': data,
                //     'Access-Control-Allow-Headers': 'X-Custom-Header'
                // })
                // let authheaders = new Headers();
                // authheaders.append('access_token', data);
                // let options = new RequestOptions({ headers: authheaders })

                var headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*');
                headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
                headers.append('Accept', 'application/json');
                headers.append('content-type', 'application/json');
                let options = new RequestOptions({ headers: headers });


                return new Promise((resolve, reject) => {
                    this.http.get(url, options)
                        .subscribe(datavalue => {
                            console.log("GlobalpostwithHeader_service success", datavalue);
                            // return callback(datavalue);
                        },
                            error => {
                                console.log("GlobalpostwithHeader_service error", error);
                                // return callback(error);

                            });
                })
            }
            else {
                console.log(Object.keys(data));
                let body = new FormData();
                console.log("length", Object.keys(data).length);
                if (Object.keys(data).length > 0) {
                    for (this.i = 0; this.i < Object.keys(data).length; this.i++) {
                        body.append(Object.keys(data)[this.i], (<any>Object).values(data)[this.i]);
                        console.log("body", body);
                    }

                }
                else {
                    alert("empty body");
                }
                console.log("post");
                console.log(url);
                console.log("body", body);
                return new Promise((resolve, reject) => {
                    this.http.post(url, body)
                        .subscribe(datavalue => {
                            console.log("GlobalpostwithHeader_service success", datavalue);
                            return callback(datavalue);


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

