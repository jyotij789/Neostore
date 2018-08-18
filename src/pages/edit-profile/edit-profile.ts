import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    public email: string;
    public phnumber: string;
    public myDate: Date;
    public userFormattedData = [];
    public profile_pic: any;
    public status: number;
    constructor(private camera: Camera, private transfer: FileTransfer,
        private file: File, private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public apiservice: ProvidersApiservice, public providerUrl: ProvidersUrl, public providerGlobal: ProvidersGlobal, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
        this.userFormattedData = this.navParams.get('userFormattedData');
    }
    submitprofile() {
        let phoneregex = /^[0-9#*+]{10,12}$/;
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
        let data = {
            'email': this.email,
            'dob': this.myDate,
            'phone_no': this.phnumber,
            'profile_pic': this.profile_pic
        }
        if (this.email == null || this.email == "" || !emailregex.test(this.email)) {
            return this.providerGlobal.alertMessage("Enter Valid Email", "Error");
        }

        else if (this.phnumber == null || this.phnumber == "") {
            return this.providerGlobal.alertMessage("Enter Phone Number", "Error");
        }
        else if (!phoneregex.test(this.phnumber)) {
            return this.providerGlobal.alertMessage("Phone number must be between of 10-12 digits", "Error");
        }

        else if (this.myDate == null) {
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
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
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

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
    }
}
