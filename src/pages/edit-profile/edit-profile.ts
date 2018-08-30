import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, Platform } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

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
    public base64Image: string;
    public user_data = [];
    constructor(private camera: Camera,
        public actionSheetCtrl: ActionSheetController,
        public apiservice: ProvidersApiservice,
        public providerUrl: ProvidersUrl,
        public providerGlobal: ProvidersGlobal,
        public navParams: NavParams,
        private imagePicker: ImagePicker,
        private base64: Base64) {
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
            // this.dob = user_data[0].dob;
            this.path = user_data[0].profile_pic;
        }
        else {
            this.path = "../../assets/imgs/logo.png";
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
            'profile_pic': this.base64Image
        }
        if (this.email == null || this.email == "" || !emailregex.test(this.email)) {
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
            localStorage.removeItem("User_Account_Details");
            localStorage.setItem("User_Account_Details", JSON.stringify(response));
        }
        else if (this.status == 400) {
            this.providerGlobal.alertMessage("Data missing.", "Error");
        }
        else if (this.status == 402) {
            this.providerGlobal.alertMessage("Invalid Access Token.", "Error");
        }
        else if (this.status == 500) {
            this.providerGlobal.alertMessage("Method has to be post.", "Error");
        }
        else {
            this.providerGlobal.alertMessage("Error", "Error");

        }
    }
    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'From Gallery',
                    handler: () => {
                        this.choosePicture(0);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(1);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    public choosePicture(sourceType: number) {
        console.log('sourceType', sourceType);
        let options = {
            quality: 100,
            title: 'Select Picture',
            maximumImagesCount: 1,
            outputType: 0
        };
        this.imagePicker.getPictures(options).then(results => {
            for (var i = 0; i < results.length; i++) {
                this.path = results[i];
                // alert('Image URI: ' + results[i]);
                this.base64.encodeFile(this.path).then((base64File: string) => {
                    this.base64Image = base64File;
                }, (err) => {
                    this.providerGlobal.presentToast('Error while selecting base64File.');
                });
                // let base64Image = 'data:image/jpeg;base64,' + this.path;
                // console.log('base64Image', base64Image);
            }
        }, error => {
            this.providerGlobal.presentToast('Error while selecting image.');

        })

    }
    public takePicture(sourceType: number) {
        // Create options for the Camera Dialog
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.path = imageData;
            alert(this.path);
            this.base64.encodeFile(this.path).then((base64File: string) => {
                this.base64Image = base64File;
            }, (err) => {
                this.providerGlobal.presentToast('Error while selecting base64File.');
            });
            // let base64Image = 'data:image/jpeg;base64,' + this.path;
            // console.log('base64Image', base64Image);

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });
    }

}