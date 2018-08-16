import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ProvidersGlobal {
    public currentPlatform: any;
    public plt: any
    public android: string;
    public ios: string;
    public mobileweb: string;
    constructor(public alertCtrl: AlertController, public platform: Platform) {

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

}
