import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { IonicPage, LoadingController, AlertController,NavParams , NavController, Header } from 'ionic-angular';
import { Network } from '@ionic-native/network'; 
import { ProvidersUrl }from '../providers/url';
import { Platform } from 'ionic-angular';
@Injectable()
export class ProvidersApiservice {

  constructor(public httpclient: HttpModule,public http:Http) {
    console.log('Hello ProvidersProvider Provider');
}
globalApiRequest(method, url, data, callback) {
    let headers = new Headers();
    console.log("asddff");

    // alert(this.Access_Token);
    //console.log("accesssssssss tokkkaaann",this.Access_Token);
    // headers.append("access_token", this.Access_Token);
    // let completeUrl = this.mainurl + url;
    // let oldthos = this;
    // console.log(completeUrl, "<--getdata--->", data);
    if(method == 'get'){

        return new Promise((resolve, reject) => {
            this.http.get(url)
                .subscribe(data => {
                    console.log("GlobalpostwithHeader_service success", data);
    
                    resolve(data.json());
                }, error => {
                    console.log("GlobalpostwithHeader_service error", error);
    
                    reject(error);
                })
        })
    }
    else{
        console.log("post");
        console.log(url);
        console.log(data);

    return new Promise((resolve, reject) => {
        this.http.post(url, JSON.stringify(data))
        .subscribe(data => {
            
            console.log("GlobalpostwithHeader_service success", data);

            resolve(data.json());
        }, error => {
            console.log("GlobalpostwithHeader_service error", error);

            reject(error);
          });
    });
}
}


       
}
                // public url:ProvidersUrl,
                // public http:Http, public reponse:Response,
                // public requestoption:RequestOptions, public header:Headers,
                // public request:Request, public requestmethod:RequestMethod,
                // public network:Network