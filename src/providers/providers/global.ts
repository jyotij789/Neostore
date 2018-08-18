import { IonicPage, NavController, Platform, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ProvidersGlobal {
    public currentPlatform: any;
    public ios: string;
    public mobileweb: string;
    public accessToken: string;
    public loading: any;
    constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform) {

    }

    alertMessage(message, title) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    }

    platformDetect() {
        if (this.platform.is('mobileweb')) {
            return 'mobileweb';
        } else {
            return 'other';
        }
    }
    getAccesstoken() {
        this.accessToken = JSON.parse(localStorage.getItem("formattedResponse"));
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();
    }

}
