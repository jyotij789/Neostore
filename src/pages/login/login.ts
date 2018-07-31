import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { MyAccountPage } from '../my-account/my-account';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  demopage(){
    this.navCtrl.push(MyAccountPage);
  }
}
