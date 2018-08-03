import { IonicPage,NavController,NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ProvidersGlobal {


constructor(public alertCtrl : AlertController){
}

alertMessage(message){
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
