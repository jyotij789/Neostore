import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform, AlertController, NavController } from 'ionic-angular';

@Injectable()
export class ProvidersNetwork {
    public onlinealert: any;
    public offlinealert: any;
    constructor(public platform: Platform, public alertCtrl: AlertController) {
        console.log('Hello ProvidersNetwork Provider');
    }


    offlineAlert() {
        this.offlinealert = this.alertCtrl.create({
            title: 'Disconnected',
            message: ' offline Please connect your device to internet',
            buttons: [
                {
                    text: 'Close',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ], enableBackdropDismiss: false
        });

        console.log('offline network was Disconnected');
        this.offlinealert.present();
    }


    //define again alert
    onlineAlert() {
        this.onlinealert = this.alertCtrl.create({
            title: 'Disconnected',
            message: 'online your device not connected to internet',
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        // this.platform.exitApp();
                    }
                }
            ], enableBackdropDismiss: false
        });
        console.log('online network is connected');
        this.onlinealert.present();
    }
    onlineAlertDismiss() {
        this.offlinealert.dismiss();
        console.log("offlineloader dismiss");
    }
}