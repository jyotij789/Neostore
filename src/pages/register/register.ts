import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProvidersUrl } from '../../providers/providers/url';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice} from '../../providers/providers/apiservice'
// import { ProvidersApiservice } from '../../providers/providers/apiservice';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public phoneNumber: string;
  public autoManufacturers: any;
  public term: any;
  public gender:string='M';
  constructor(private alertCtrl: AlertController,public providerglobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams, public providerurl:ProvidersUrl, public apiservice: ProvidersApiservice) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log(this.providerurl.register);

    // console.log(this.female);
  }
  registeruser() {
    let regex = /^[a-zA-Z]{2,30}$/;
    let phoneRegex = /^[0-9#*+]{10,12}$/;
    let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
    let requestData={
      first_name: this.firstName,
      last_name:this.lastName ,
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword,
      gender: this.gender,
      phone_no: this.phoneNumber,
    }
    if (this.firstName == null || this.firstName == "") {
      //return this.firstnameError();
      this.providerglobal.alertMessage("Enter First Name");
    }
    else if (!regex.test(this.firstName)) {
      this.providerglobal.alertMessage("Enter First Name of 2-30 characters");
    }
    else if (this.lastName == null || this.lastName == "") {
      this.providerglobal.alertMessage("Enter Lastname");
    }
    else if (!regex.test(this.lastName)) {
      this.providerglobal.alertMessage("Enter Last Name of 2-30 characters");
    }
    else if (this.email == null || this.email == "") {
      this.providerglobal.alertMessage("Enter Valid Email");
    }
    else if(!emailRegex.test(this.email))
    {
      this.providerglobal.alertMessage("Enter Valid Email");
    }
    else if (this.password == null || this.password == "") {
      this.providerglobal.alertMessage("Enter Password");
    }
    else if (this.confirmPassword == null || this.confirmPassword == "") {
      this.providerglobal.alertMessage("Enter Confirm password");
    }
    else if (this.phoneNumber == null || this.phoneNumber == "") {
      this.providerglobal.alertMessage("Enter Phone Number");
    }
    else if(this.password != this.confirmPassword)
    {
      this.providerglobal.alertMessage("Password must be same");
    }
    else if(!phoneRegex.test(this.phoneNumber))
    {
      this.providerglobal.alertMessage("Phone number must be between of 10-12 digits");
    }
    else{
      this.apiservice.globalApiRequest('post',this.providerurl.register, requestData, this.callback);
    }
    

  }

  callback(response){
    console.log(response);
  }
  termsChecked($event){
    if(!$event.checked){
      this.checkboxError();
    }
  }
  genderError() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Choose Gender',
      buttons: ['Ok']
    });
    alert.present();
  }
  checkboxError() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Select Checkbox',
      buttons: ['Ok']
    });
    alert.present();
  }
}
