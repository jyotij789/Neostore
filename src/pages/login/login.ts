import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { MyAccountPage } from '../my-account/my-account';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:string;
  public password:string;
  constructor(public providerglobal :ProvidersGlobal, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }
  
  getHome(){
    let regex = /^[a-zA-Z]{2,30}$/;

    if(this.email==null || this.email== ""){
       this.providerglobal.alertMessage("Enter Username");
    }
    else if(this.password==null || this.password== ""){
      this.providerglobal.alertMessage("Enter password");
    }
    else{
    this.navCtrl.setRoot(HomePage);
  }
}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  createAccount(){
    this.navCtrl.push(RegisterPage);
  }
  forgotPassword(){
    this.navCtrl.push(ForgotpasswordPage);
  }
  
}
