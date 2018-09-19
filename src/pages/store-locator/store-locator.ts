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
    @ViewChild('map') directionsPanel: ElementRef;
    public map: any
    public marker: any;
    public currentLatitude: any;
    public currentLongitude: any;

    public directionsService = new google.maps.DirectionsService;
    public directionsDisplay = new google.maps.DirectionsRenderer;
    public storeList = [{
        name: "NeoSOFT Technologies",
        address: "Unit No 501, Sigma IT Park, Plot No R-203,204",
        latitude: 19.1410776,
        longitude: 73.008735
    },
    {
        name: "NeoSOFT Technologies",
        address: "The Ruby,29,Senapati Bapat Marg,Dadar West",
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

    }
    ionViewWillEnter() {
        console.log('ionViewWillEnter StoreLocatorPage');
        this.getCurrentLocation();

    }
    refresh() {
        this.ionViewWillEnter();
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

    getCurrentLocation() {
        this.geolocation.getCurrentPosition().then((position) => {
            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            let currentlatLng = new google.maps.LatLng(this.currentLatitude, this.currentLongitude);
            console.log("current position", this.currentLatitude + this.currentLongitude);
            let mapOptions = {
                center: currentlatLng,
                zoom: 7,
                map: this.map,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.getMarkers();

        }, (err) => {
            console.log(err);
        });

    }
    getMarkers() {
        for (let i = 0; i < this.storeList.length; i++) {
            if (i >= 0)
                this.addMarkersToMap(this.storeList[i]);
        }
    }
    addMarkersToMap(store) {
        let position = new google.maps.LatLng(store.latitude, store.longitude);
        let storeLocator = new google.maps.Marker({ map: this.map, position: position, title: 'Click to zoom' });
        google.maps.event.addListener(storeLocator, 'click', () => {
            this.itemTapped(event, store)
        });
    }

    itemTapped($event, store) {
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        this.directionsService.route({
            origin: { lat: this.currentLatitude, lng: this.currentLongitude },
            destination: { lat: store.latitude, lng: store.longitude },
            travelMode: 'DRIVING'
        }, (res, status) => {

            if (status == google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });

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
