import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Trail } from 'src/app/models/trail.model';
import { Map as OLMap } from 'openlayers'

@Component({
  selector: 'app-trail-map',
  templateUrl: './trail-map.component.html',
  styleUrls: ['./trail-map.component.scss']
})
export class TrailMapComponent implements OnInit {
  private map: OLMap
  @Input() trail: Trail

  constructor () { }

  ngOnInit () {
    if (this.trail) {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: olProj.fromLonLat(this.trail.location),
          zoom: 5
        })
      });
    }
  }

  ngOnChanges () {
    if (this.trail && this.map) {
      this.map.getView().setCenter(olProj.fromLonLat(this.trail.location))
    }
  }

}
