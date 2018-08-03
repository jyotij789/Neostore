import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global'
@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
public oldpassword:string;
public confirmpassword:string;
public newpassword:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerglobal: ProvidersGlobal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  changePassword(){
  if (this.oldpassword == null || this.oldpassword == "") {
    this.providerglobal.alertMessage("Enter Password");
  }
  else if (this.newpassword == null || this.newpassword == "") {
    this.providerglobal.alertMessage("Enter New password");
  }
  else if (this.confirmpassword == null || this.confirmpassword == "") {
    this.providerglobal.alertMessage("Enter Confirm password");
  }
  else if(this.newpassword != this.confirmpassword)
    {
      this.providerglobal.alertMessage("Password must be same");
    }
  }
}
