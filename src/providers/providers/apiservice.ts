import { Injectable, ViewChild } from '@angular/core';
// import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    public name: any;
    public i: number;
    public apiToken: string;
    public formattedData: string;

    public body = {};
    @ViewChild(Nav) nav: Nav;
    constructor(public HTTP: HTTP, public http: Http, public platformGlobal: ProvidersGlobal) {
        console.log('Hello ProvidersProvider Provider');
        this.formattedData = JSON.parse(localStorage.getItem("formattedResponse"));


    }
    // GlobalAPICall method
    public globalApiRequest(method, url, data, token, callback) {
        console.log(token);
        data != null ? this.body = data : this.body = null;
        token != null ? this.apiToken = this.formattedData : this.apiToken = null;

        // Testing platform
        let platform = this.platformGlobal.platformDetect();
        console.log("platform", platform);
        if (platform == "other") {
            //Device get method
            if (method == 'get') {
                let header = new Headers({
                    'access_token': this.apiToken,
                });

                this.HTTP.get(url, this.body, { headers: header })
                    .then(response => {
                        console.log("TEST");
                        var formattedResponse = JSON.parse(response.data);
                        return callback(formattedResponse);
                    })
                    .catch(error => {
                        console.log("GlobalpostwithHeader_service error", error);
                        var formattedResponse = JSON.parse(error.data);
                        return callback(formattedResponse);
                    });

            }
            else {
                let header = new Headers({
                    'access_token': this.apiToken,
                });
                //Device post method
                console.log("post");
                console.log(this.HTTP.getDataSerializer());
                this.HTTP.setDataSerializer("urlencoded");
                this.HTTP.post(url, this.body, { headers: header })
                    .then(response => {
                        var formattedResponse = JSON.parse(response.data);
                        return callback(formattedResponse);

                    })
                    .catch(error => {
                        var formattedResponse = JSON.parse(error.data);
                        return callback(formattedResponse);

                    });
            }
        }

        else {
            // Browser get method
            if (method == 'get') {
                const header = new Headers({
                    'access_token': this.apiToken,
                    'Access-Control-Allow-Headers': 'X-Custom-Header'
                })

                return new Promise((resolve, reject) => {
                    this.http.get(url, { headers: header })
                        .subscribe(response => {
                            var formattedData = response.json();
                            return callback(formattedData.data);
                        },
                            error => {
                                var formattedData = error.json();
                                return callback(formattedData.data);
                            });
                })
            }
            else {
                // Browser post method
                console.log(Object.keys(this.body));
                let body = new FormData();
                console.log("length", Object.keys(this.body).length);
                if (Object.keys(this.body).length > 0) {
                    for (this.i = 0; this.i < Object.keys(this.body).length; this.i++) {
                        body.append(Object.keys(this.body)[this.i], (<any>Object).values(this.body)[this.i]);
                    }

                }
                else {
                    alert("empty body");
                }
                const header = new Headers({
                    'access_token': this.apiToken,
                    'Access-Control-Allow-Headers': 'X-Custom-Header'
                })
                console.log("post");
                return new Promise((resolve, reject) => {
                    this.http.post(url, body, { headers: header })
                        .subscribe(response => {
                            console.log("success");
                            let formattedData = response.json();
                            return callback(formattedData);


                        },
                            error => {
                                console.log("error");
                                let formattedData = error.json();
                                return callback(formattedData);

                            });
                });
            }
        }


    }
}

