import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Form } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http } from '@angular/http';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { HomePage } from '../home/home';

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
    public user_address: any;
    constructor(public providerUrl: ProvidersUrl, public apiservice: ProvidersApiservice,
        public providerglobal: ProvidersGlobal, public stripe: Stripe,
        public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaycardPage');
        this.user_address = this.navParams.get('user_address');
        this.cardCVV = '242',
            this.cardYear = 2019,
            this.cardMonth = 2,
            this.cardNumber = '4242424242424242'
    }

    pay() {
        var cardregex = /^[0-9]{16}$/;
        var cardCVVregex = /^[0-9]{3}$/;
        var today = new Date();
        let today_year = today.getFullYear();
        if (this.cardNumber == null || this.cardNumber == "" || cardregex.test(this.cardNumber) == false) {
            this.providerglobal.alertMessage("Card number must be of 16 digits", "Error");
        }
        else if (this.cardMonth == null || isNaN(this.cardMonth) || this.cardMonth < 1 || this.cardMonth > 12) {
            this.providerglobal.alertMessage("Invalid card month" + "<br>" + "Enter in 1-12 format", "Error");
        }
        else if (this.cardYear == null || isNaN(this.cardYear) || this.cardYear < today_year) {
            this.providerglobal.alertMessage("Invalid card year", "Error");
        }
        else if (this.cardCVV == null || this.cardCVV == "" || cardCVVregex.test(this.cardCVV) == false) {
            this.providerglobal.alertMessage("cardCVV must be of 3 digits", "Error");
        }
        else {
            this.providerglobal.showLoader();
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
                    'amount': 2000
                }
                this.http.post('http://192.168.2.1:3333/processpay', data, {})

                    .subscribe((res) => {
                        console.log("server.res", res);
                        if (res.json().success && res.status == 200) {
                            this.providerglobal.stopLoader();
                            return this.paymentgatewaycallback();
                        }
                        else {
                            this.providerglobal.stopLoader();
                            alert("transaction failed");
                        }
                    })
            });
        }
    }
    paymentgatewaycallback = () => {
        let data = {
            'address': this.user_address
        };
        let apitoken = "token";
        this.apiservice.globalApiRequest('post', this.providerUrl.order, data, apitoken, this.orderCallback);
    }
    orderCallback = (response) => {
        this.providerglobal.stopLoader();
        console.log("orderCallback", response);
        let status = response.status;
        if (status == 200) {
            this.providerglobal.alertMessage(response.user_msg, "Success");
            this.navCtrl.setRoot(HomePage);
        }
        else {
            this.providerglobal.alertMessage("Error", "Error");
        }
    }
}
