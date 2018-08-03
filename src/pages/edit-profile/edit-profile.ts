import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public fname: string;
  public lname: string;
  public email: string;
  public phnumber: string;
  public dob: Date;

  constructor(public providerglobal: ProvidersGlobal,public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  submitprofile(){
    let regex = /^[a-zA-Z]{2,30}$/;
    let phoneregex = /^[0-9#*+]{10,12}$/;
    let emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
  if (this.fname == null || this.fname == "") {
    return this.providerglobal.alertMessage("Enter Firstname");
  }
  else if (!regex.test(this.fname)) {
    return this.providerglobal.alertMessage("Enter First Name of 2-30 characters");
  }
  else if(this.lname == null || this.lname == ""){
    return this.providerglobal.alertMessage("Enter Lastname");

  }
  else if (!regex.test(this.lname)) {
    return this.providerglobal.alertMessage("Enter Last Name of 2-30 characters");
  }
  else if (this.email == null || this.email == "" || !emailregex.test(this.email)) {
    return this.providerglobal.alertMessage("Enter Valid Email");
  }
  
  else if (this.phnumber == null || this.phnumber == "") {
    return this.providerglobal.alertMessage("Enter Phone Number");
  }
  else if(!phoneregex.test(this.phnumber))
    {
      return this.providerglobal.alertMessage("Phone number must be between of 10-12 digits");
    }
    
  else if (this.dob == null) {
    return this.providerglobal.alertMessage("Enter DOB");
  }
  else{

  }
 }

}
