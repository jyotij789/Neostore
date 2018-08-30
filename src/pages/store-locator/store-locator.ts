import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'page-store-locator',
    templateUrl: 'store-locator.html',
})
export class StoreLocatorPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any
    constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StoreLocatorPage');
    }

    // loadMap() {
    //     this.geolocation.getCurrentPosition().then((position) => {
    //       console.log(position);
    //     let lat= position.coords.latitude;
    //      let lng= position.coords.longitude; 
    //      console.log(lat,lng);
    // //   let latLng = new google.maps.LatLng(lat,lng);

    //     let mapOptions = {
    //     //   center: latLng,
    //       zoom: 15,
    //     //   mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }

    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //     let marker = new google.maps.Marker({
    //         position: latLng,
    //         map: this.map,
    //         animation: google.maps.Animation.DROP
    //       })
    //         // let content = "<h4>Your Location!</h4>";   
    //         // let infoWindow = new google.maps.InfoWindow({
    //         //   content: content
    //         // });

    //         google.maps.event.addListener(marker, 'click', () => {
    //           console.log("marker");
    //         });

    //   }, (err) => {
    //     console.log(err);
    //   });
    // }

}
