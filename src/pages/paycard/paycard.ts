import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
    selector: 'page-paycard',
    templateUrl: 'paycard.html',
})
export class PaycardPage {
    public cardNumber: string;
    public cardMonth: number;
    public cardYear: number;
    public cardCVV: string;
    public cardinfo: any;
    constructor(public stripe: Stripe, public HTTP: HTTP, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaycardPage');
        this.cardCVV = '242',
            this.cardYear = 2019,
            this.cardMonth = 2,
            this.cardNumber = '4242424242424242'
    }


    pay() {
        this.cardinfo = {
            number: this.cardNumber,
            expMonth: this.cardMonth,
            expYear: this.cardYear,
            cvc: this.cardCVV
        }
        this.stripe.setPublishableKey('pk_test_w0XMPTXQ5FlE2L5DqwEQ1Vj4');
        this.stripe.createCardToken(this.cardinfo).then((token) => {
            console.log(token);
            // var data = 'stripetoken=' + token + '&amount=50';
            var data = {
                'stripetoken': token.id,
                'amount': 50
            }
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post('http://192.168.2.1:3333/processpay', data, {})
                .subscribe((res) => {
                    console.log("server.res", res);
                    if (res.json().success && res.json().status == 200)
                        return this.paymentgatewaycallback();
                    alert('transaction Successfull!!')
                })
        });
    }
    paymentgatewaycallback = () => {

    }
    // validateCard() {
    //     let card = {
    //         number: this.cardNumber,
    //         expMonth: this.cardMonth,
    //         expYear: this.cardYear,
    //         cvc: this.cardCVV
    //     };

    //     // Run card validation here and then attempt to tokenise

    //     this.stripe.createCardToken(card)
    //         .then(token => console.log(token))
    //         .catch(error => console.error(error));
    // }
}
