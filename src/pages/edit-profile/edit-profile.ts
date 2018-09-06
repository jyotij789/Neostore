import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, DateTime } from 'ionic-angular';
import { ActionSheetController, Platform } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
// import { Base64 } from '@ionic-native/base64';
import { HomePage } from '../home/home';
import { DateTimeData } from 'ionic-angular/util/datetime-util';
import { Observable, Observer } from 'rxjs';
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    public first_name: string;
    public last_name: string;
    public email: string;
    public phone_no: string;
    public mydob: DateTimeData;
    public userFormattedData = [];
    public status: number;
    public path: string;
    public myPhoto: any;
    public Photo: any;
    constructor(private camera: Camera,
        public actionSheetCtrl: ActionSheetController,
        public apiservice: ProvidersApiservice,
        public providerUrl: ProvidersUrl,
        public providerGlobal: ProvidersGlobal,
        public navParams: NavParams,
        private imagePicker: ImagePicker,
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
            this.mydob = user_data[0].dob;
            this.myPhoto = user_data[0].profile_pic;
            this.Photo = user_data[0].profile_pic;
            this.getBase64ImageFromURL(this.Photo).subscribe(base64data => {
                console.log(base64data);
                this.myPhoto = base64data;
                // this.base64Image = 'data:image/jpg;base64,'+base64data;
            });

        }
        else {
            this.myPhoto = "../../assets/imgs/logo.png";
        }
    }
    getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    getBase64Image(img: HTMLImageElement) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });


    }
    public takePicture(sourceType: number) {
        // Create options for the Camera Dialog
        const options: CameraOptions = {
            quality: 50,
            sourceType: sourceType,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: 0
        };

        this.camera.getPicture(options).then((imageData) => {
            this.myPhoto = 'data:image/jpeg;base64,' + imageData;

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });
    }
    submitprofile() {
        let phoneregex = /^[0-9#*+]{10,12}$/;
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;

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

        else if (this.mydob == null) {
            return this.providerGlobal.alertMessage("Enter DOB", "Error");
        }

        else {
            console.log("myPhoto1", this.myPhoto);
            let data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'dob': this.mydob,
                'phone_no': this.phone_no,
                'profile_pic': this.myPhoto
            }
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
        else if (this.status == 400 || this.status == 402 || this.status == 500) {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");
        }
        else {
            this.providerGlobal.alertMessage(response.message + "<br>" + response.user_msg, "Error");

        }
    }

}