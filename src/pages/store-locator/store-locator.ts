import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector: 'page-store-locator',
    templateUrl: 'store-locator.html',
})
export class StoreLocatorPage {
    @ViewChild('map') mapElement: ElementRef;
    public map: any
    public marker: any;
    public storeList = [{
        name: "NeoSOFT Technologies",
        address: "Unit No 501, Sigma IT Park, Plot No R-203,204," + "<br>" + "Midc TTC Industrial Area. Rabale, Navi Mumbai",
        latitude: 19.1410776,
        longitude: 73.008735
    },
    {
        name: "NeoSOFT Technologies",
        address: "4th Floor, The Ruby, 29, Senapati Bapat Marg, Dadar West, Mumbai, Maharashtra 400028",
        latitude: 19.024365,
        longitude: 72.84428100000002
    },
    {
        name: "NeoSOFT Technologies",
        address: "Unique Industrial Estate, 124, SVS Rd, Off,Prabhadevi, Mumbai, Maharashtra 400025",
        latitude: 19.01803,
        longitude: 72.82834300000002
    },
    {
        name: "NeoSOFT Technologies",
        address: "NTPL SEZ (Blueridge), IT6, 1st Floor, Rajiv Gandhi - Infotech Park, Phase-I, Hinjewadi, Pune, Maharashtra 411057",
        latitude: 18.5796039,
        longitude: 73.73868790000006
    }];
    constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StoreLocatorPage');
        this.loadMap();
        this.getMarkers();
        console.log(this.storeList.length);
    }

    loadMap() {
        let latLng = new google.maps.LatLng(19.1410776, 73.008735);

        let mapOptions = {
            center: latLng,
            disableDefaultUI: false,
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            animation: google.maps.Animation.DROP
        });
        this.addInfoWindow(this.marker);

        // let content = "<h4>Your Location!</h4>";   
        // let infoWindow = new google.maps.InfoWindow({
        //   content: content
        // });
    }
    getMarkers() {
        for (let i = 0; i < this.storeList.length; i++) {
            if (i >= 0)
                this.addMarkersToMap(this.storeList[i]);

        }
    }

    addMarkersToMap(store) {
        var position = new google.maps.LatLng(store.latitude, store.longitude);
        var storeLocator = new google.maps.Marker({ position: position, title: store.name });
        storeLocator.setMap(this.map);
    }

    addInfoWindow(marker) {
        console.log("tag", marker);

        let infoWindow = new google.maps.InfoWindow({
            content: "content"
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

}
