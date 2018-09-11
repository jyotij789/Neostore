import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';

@IonicPage()
@Component({
    selector: 'page-paycard',
    templateUrl: 'paycard.html',
})
export class PaycardPage {
    cardNumber: string;
    cardMonth: number;
    cardYear: number;
    cardCVV: string;
    cardinfo: any;
    constructor(public stripe: Stripe, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaycardPage');
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
            var data = 'stripetoken=' + token + '&amount=50';
            var headers = new Headers();
            headers.append('Conent-Type', 'application/x-www-form-urlencoded');
            this.http.post('http://192.168.2.255:3333/processpay', data, { headers: headers })
                .subscribe((res) => {
                    if (res.json().success)
                        alert('transaction Successfull!!')
                })
        })
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
