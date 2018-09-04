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
        address: "Unit No 501, Sigma IT Park, Plot No R-203,204",
        latitude: 19.1410776,
        longitude: 73.008735
    },
    {
        name: "NeoSOFT Technologies",
        address: "4th Floor,The Ruby, 29,Senapati Bapat Marg,Dadar West",
        latitude: 19.024365,
        longitude: 72.84428100000002
    },
    {
        name: "NeoSOFT Technologies",
        address: "Unique Industrial Estate, 124, SVS Rd, Off,Prabhadevi",
        latitude: 19.01803,
        longitude: 72.82834300000002
    },
    {
        name: "NeoSOFT Technologies",
        address: "Blueridge,Rajiv Gandhi-Infotech Park,Hinjewadi,Pune",
        latitude: 18.5796039,
        longitude: 73.73868790000006
    }];
    constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StoreLocatorPage');
        let latLng = new google.maps.LatLng(19.1410776, 73.008735);
        this.loadMap(7, latLng);
        this.getMarkers();
        console.log(this.storeList.length);
    }

    loadMap(zoom, latLng) {
        let mapOptions = {
            center: latLng,
            disableDefaultUI: true,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }
    getMarkers() {
        for (let i = 0; i < this.storeList.length; i++) {
            if (i >= 0)
                this.addMarkersToMap(this.storeList[i]);
        }
    }

    addMarkersToMap(store) {
        let position = new google.maps.LatLng(store.latitude, store.longitude);
        let storeLocator = new google.maps.Marker({ map: this.map, position: position });
    }

    itemTapped($event, store) {
        console.log("store", store.name);
        let latLng = new google.maps.LatLng(store.latitude, store.longitude);
        this.loadMap(15, latLng);
        let marker = new google.maps.Marker({ map: this.map, position: latLng, title: store.name });
        this.addInfoWindow(marker, store.address);

    }
    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }
}
