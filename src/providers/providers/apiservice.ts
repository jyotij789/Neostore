import { Injectable, ViewChild } from '@angular/core';
// import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { ProvidersGlobal } from '../../providers/providers/global';
import { Nav } from 'ionic-angular';
@Injectable()
export class ProvidersApiservice {
    public data: any;
    public i: number;
    public apiToken: string;
    public formattedData: string;

    public body = {};
    @ViewChild(Nav) nav: Nav;
    constructor(public HTTP: HTTP, public http: Http, public platform: ProvidersGlobal) {
        console.log('Hello ProvidersProvider Provider');
    }
    // GlobalAPICall method
    public globalApiRequest(method, url, data, token, callback) {
        this.platform.showLoader();
        this.formattedData = JSON.parse(localStorage.getItem("formattedResponse"));
        data != null ? this.body = data : this.body = null;
        token != null ? this.apiToken = this.formattedData : this.apiToken = null;
        console.log("Jthis.body", this.body);

        // Testing platform
        let platform = this.platform.platformDetect();
        console.log("platform", platform);
        if (platform == "other") {
            this.devicePlatform(method, url, data, token, callback);
        }
        else {
            this.webViewPlatform(method, url, data, token, callback);
        }
    }
    public devicePlatform(method, url, data, token, callback) {
        //Device get method
        if (method == 'get') {
            this.HTTP.get(url, this.body, { 'access_token': this.apiToken })
                .then(response => {
                    console.log("GlobalgetwithHeader_service successs", response);
                    var formattedResponse = JSON.parse(response.data);
                    return callback(formattedResponse);
                })
                .catch(error => {
                    console.log("GlobalgetwithHeader_service error", error);
                    let formattedData: any;
                    error.status == 0 ? formattedData = error : formattedData = JSON.parse(error.error);
                    return callback(formattedData);
                });


        }
        else {
            //Device post method
            this.apiToken != null ? this.data = { 'access_token': this.apiToken } : this.data = {};
            this.HTTP.post(url, this.body, this.data)
                .then(response => {
                    console.log("GlobalpostwithHeader_service success", response);
                    var formattedResponse = JSON.parse(response.data);
                    return callback(formattedResponse);

                })
                .catch(error => {
                    console.log("GlobalpostwithHeader_service error", error);
                    let formattedData: any
                    error.status == 0 ? formattedData = error : formattedData = JSON.parse(error.error);
                    return callback(formattedData);

                });
        }
    }

    public webViewPlatform(method, url, data, token, callback) {
        // Browser get method
        if (method == 'get') {
            const header = new Headers({
                'access_token': this.apiToken,
                'Access-Control-Allow-Headers': 'X-Custom-Header'
            })
            let options = new RequestOptions({ headers: header, params: (this.body) });
            console.log('options', options);
            return new Promise((resolve, reject) => {
                this.http.get(url, options)
                    .subscribe(response => {
                        var formattedData = response.json();
                        return callback(formattedData);
                    },
                        error => {
                            console.log("GlobalgetwithHeader_service error", error);
                            var formattedData = error.json();
                            return callback(formattedData);
                        });
            })
        }
        else {
            // Browser post method
            console.log(this.body);
            let body = new FormData();
            if (Object.keys(this.body).length > 0) {
                for (this.i = 0; this.i < Object.keys(this.body).length; this.i++) {
                    body.append(Object.keys(this.body)[this.i], (<any>Object).values(this.body)[this.i]);
                }
            }
            else { alert("empty body"); }
            const header = new Headers({
                'access_token': this.apiToken,
                'Access-Control-Allow-Headers': 'X-Custom-Header'
            })
            console.log("post");
            return new Promise((resolve, reject) => {
                this.http.post(url, body, { headers: header })
                    .subscribe(response => {
                        let formattedData = response.json();
                        return callback(formattedData);
                    },
                        error => {
                            console.log("GlobalpostwithHeader_service error", error);
                            console.log(error.status);
                            let formattedData: any;
                            return callback(formattedData);

                        });
            });
        }
    }
}

