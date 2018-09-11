import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform, AlertController, NavController, LoadingController } from 'ionic-angular';

@Injectable()
export class ProvidersNetwork {
    public onlinealert: any;
    public offlinealert: any;
    constructor(public platform: Platform, public alertCtrl: AlertController, public loder: LoadingController) {
        console.log('Hello ProvidersNetwork Provider');
    }


    offlineAlert() {
        // this.offlinealert = this.alertCtrl.create({
        //     title: 'Disconnected',
        //     message: ' offline Please connect your device to internet',
        //     buttons: [
        //         {
        //             text: 'Close',
        //             handler: () => {
        //                 this.platform.exitApp();
        //             }
        //         }
        //     ], enableBackdropDismiss: false
        // });

        // console.log('offline network was Disconnected');
        // this.offlinealert.present();
        this.offlinealert = this.loder.create({
            content: 'No internet connection.',
            duration: 4000
        });

        this.offlinealert.present();
    }

    //define again alert


    onlineAlertDismiss() {
        this.offlinealert.dismiss();
        console.log("offlineloader dismiss");
    }
}