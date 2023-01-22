import { Component } from '@angular/core';
import * as L from 'leaflet';
//import 'leaflet-draw';
@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {
  map: L.Map;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map', {
      center: [17.4, 78.5],
      zoom: 15,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}
