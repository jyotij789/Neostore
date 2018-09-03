import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ActionSheetController, Platform } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone_no: string;
    public dob: Date;
    public userFormattedData = [];
    public status: number;
    public path: string;
    public myPhoto: any;
    public user_data = [];
    constructor(private camera: Camera,
        public actionSheetCtrl: ActionSheetController,
        public apiservice: ProvidersApiservice,
        public providerUrl: ProvidersUrl,
        public providerGlobal: ProvidersGlobal,
        public navParams: NavParams,
        private imagePicker: ImagePicker,
        private base64: Base64,
        public navCtrl: NavController,
        public events: Events) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');

    }
    ionViewWillEnter() {
        console.log('ionViewWillEnter EditProfilePage');
        let user_data = this.navParams.get('userFormattedData');
        console.log("user_data", user_data);
        if (user_data != null || user_data != undefined) {
            this.first_name = user_data[0].first_name;
            this.last_name = user_data[0].last_name;
            this.email = user_data[0].email;
            this.phone_no = user_data[0].phone_no;
            this.myPhoto = user_data[0].profile_pic;
        }
        else {
            this.myPhoto = "../../assets/imgs/logo.png";
        }
    }
    submitprofile() {
        let phoneregex = /^[0-9#*+]{10,12}$/;
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
        let data = {
            'first_name': this.first_name,
            'last_name': this.last_name,
            'email': this.email,
            'dob': this.dob,
            'phone_no': this.phone_no,
            'profile_pic': this.myPhoto
        }
        if (this.myPhoto == null || this.myPhoto == "") {
            return this.providerGlobal.alertMessage("Choose Profile", "Error");
        }
        else if (this.first_name == null || this.first_name == "") {
            return this.providerGlobal.alertMessage("Enter First Name", "Error");
        }
        else if (this.last_name == null || this.last_name == "") {
            return this.providerGlobal.alertMessage("Enter Last Name", "Error");
        }
        else if (this.email == null || this.email == "" || !emailregex.test(this.email)) {
            return this.providerGlobal.alertMessage("Enter Valid Email", "Error");
        }

        else if (this.phone_no == null || this.phone_no == "") {
            return this.providerGlobal.alertMessage("Enter Phone Number", "Error");
        }
        else if (!phoneregex.test(this.phone_no)) {
            return this.providerGlobal.alertMessage("Phone number must be between of 10-12 digits", "Error");
        }

        else if (this.dob == null) {
            return this.providerGlobal.alertMessage("Enter DOB", "Error");
        }

        else {
            let token = "token";
            this.apiservice.globalApiRequest('post', this.providerUrl.updateaccount, data, token, this.callback);
        }
    }
    callback = (response) => {
        console.log("update profile", response);
        let formattedData = response;
        this.status = formattedData.status;
        if (this.status == 200) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Success");
            this.navCtrl.setRoot(HomePage);
        }
        else if (this.status == 400) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (this.status == 402) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else if (this.status == 500) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");

        }
    }
    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Gallery',
                    icon: 'images',
                    handler: () => {
                        this.choosePicture(0);
                    }
                },
                {
                    text: 'Camera',
                    icon: 'camera',

                    handler: () => {
                        this.takePicture(1);
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'undo',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    public choosePicture(sourceType: number) {
        const optionsgallery: CameraOptions = {
            quality: 50,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(optionsgallery).then((imageData) => {
            this.myPhoto = 'data:image/jpeg;base64,' + imageData;
            console.log(this.myPhoto);

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });


    }
    public takePicture(sourceType: number) {
        // Create options for the Camera Dialog
        const options: CameraOptions = {
            quality: 50,
            sourceType: sourceType,
            // destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: 0
            // mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.myPhoto = 'data:image/jpeg;base64,' + imageData;
            console.log(this.myPhoto);

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });
    }

}