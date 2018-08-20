import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, Platform } from 'ionic-angular';
import { ProvidersGlobal } from '../../providers/providers/global';
import { ProvidersApiservice } from '../../providers/providers/apiservice'
import { ProvidersUrl } from '../../providers/providers/url';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

declare var cordova: any;
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    public email: string;
    public phnumber: string;
    public myDate: Date;
    public userFormattedData = [];
    public status: number;
    public path: string;
    public base64Image: string;
    constructor(public platform: Platform, private camera: Camera,
        private file: File, private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public apiservice: ProvidersApiservice,
        public providerUrl: ProvidersUrl,
        public providerGlobal: ProvidersGlobal,
        public navParams: NavParams,
        public transfer: FileTransfer,
        private imagePicker: ImagePicker) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditProfilePage');
        this.userFormattedData = this.navParams.get('userFormattedData');
        this.path = "../../assets/imgs/logo.png";
    }
    submitprofile() {
        let phoneregex = /^[0-9#*+]{10,12}$/;
        let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/;
        let data = {
            'email': this.email,
            'dob': this.myDate,
            'phone_no': this.phnumber,
            'profile_pic': this.base64Image
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
            outputType: 1
        };
        this.imagePicker.getPictures(options).then(results => {
            for (var i = 0; i < results.length; i++) {
                this.path = results[i];
                alert('Image URI: ' + results[i]);
                let base64Image = 'data:image/jpeg;base64,' + this.path;
                console.log('base64Image', base64Image);
            }
        }, error => {
            this.providerGlobal.presentToast('Error while selecting image.');

        })

    }
    public takePicture(sourceType: number) {
        // Create options for the Camera Dialog
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.path = imageData;
            alert(this.path);
            let base64Image = 'data:image/jpeg;base64,' + this.path;
            console.log('base64Image', base64Image);

        }, (err) => {
            this.providerGlobal.presentToast('Error while selecting image.');

        });
    }


    //     var options = {
    //         quality: 100,
    //         sourceType: sourceType,
    //         saveToPhotoAlbum: false,
    //         correctOrientation: true
    //     };
    //     // Get the data of an image
    //     this.camera.getPicture(options).then((imagePath) => {
    //         // Special handling for Android library
    //         if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //             this.filePath.resolveNativePath(imagePath)
    //                 .then(filePath => {
    //                     let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //                     let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //                     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //                 });
    //         } else {
    //             var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //             var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    //         }
    //     }, (err) => {
    //         this.providerGlobal.presentToast('Error while selecting image.');
    //     });
    // }

    // private createFileName() {
    //     var d = new Date(),
    //         n = d.getTime(),
    //         newFileName = n + ".jpg";
    //     return newFileName;
    // }

    // // Copy the image to a local folder
    // private copyFileToLocalDir(namePath, currentName, newFileName) {
    //     this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    //         this.lastImage = newFileName;
    //     }, error => {
    //         this.providerGlobal.presentToast('Error while storing file.');
    //     });
    // }
    // public pathForImage(img) {
    //     if (img === null) {
    //         return '';
    //     } else {
    //         return cordova.file.dataDirectory + img;
    //     }
    // }
    // public uploadImage() {
    //     // Destination URL
    //     // var url = "http://yoururl/upload.php";

    //     // File for Upload
    //     var targetPath = this.pathForImage(this.lastImage);
    //     console.log('targetPath', targetPath);
    //     // File name only
    //     var filename = this.lastImage;
    //     console.log('filename', filename);


    //     const fileTransfer: FileTransferObject = this.transfer.create();

    //     let options: FileUploadOptions = {
    //         fileKey: 'ionicfile',
    //         fileName: 'ionicfile',
    //         chunkedMode: false,
    //         mimeType: "image/jpeg",
    //         headers: {}
    //     }
    //     const fileTransfer: TransferObject = this.transfer.create();

    //     this.loading = this.loadingCtrl.create({
    //       content: 'Uploading...',
    //     });
    //     this.loading.present();

    //     // Use the FileTransfer to upload the image
    //     fileTransfer.upload(targetPath, url, options).then(data => {
    //       this.loading.dismissAll()
    //       this.presentToast('Image succesful uploaded.');
    //     }, err => {
    //       this.loading.dismissAll()
    //       this.presentToast('Error while uploading file.');
    //     });
    //   }

}