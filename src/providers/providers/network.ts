import { Injectable } from '@angular/core';
import { Platform, AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ProvidersNetwork {
    public onlinealert: any;
    public offlinealert: any;
    constructor(public platform: Platform, public alertCtrl: AlertController, public loder: LoadingController) {
        console.log('Hello ProvidersNetwork Provider');
    }


    offlineAlert() {

        this.offlinealert = this.loder.create({
            content: 'No internet connection.',
            duration: 4000
        });

        this.offlinealert.present();
    }

    onlineAlertDismiss() {
        this.offlinealert.dismiss();
        console.log("offlineloader dismiss");
    }
}