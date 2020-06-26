import { Component, OnInit, Input } from '@angular/core';
import 'ol'
import Map from 'ol/Map';
import View from 'ol/View';
import { Vector as VectorLayer } from 'ol/layer'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Trail } from 'src/app/models/trail.model';
import { defaults } from 'ol/control'
import { Vector as VectorSource } from 'ol/source'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'

@Component({
  selector: 'app-trail-map',
  templateUrl: './trail-map.component.html',
  styleUrls: ['./trail-map.component.scss']
})
export class TrailMapComponent implements OnInit {
  private map
  @Input() trail: Trail

  constructor () { }

  ngOnInit () {
    if (this.trail) {
      this.map = new Map({
        target: 'map',
        layers:
          [
            new TileLayer({
              source: new OSM()
            })
          ],
        view: new View({
          center: olProj.fromLonLat(this.trail.location),
          zoom: 10
        }),
        controls: defaults({
          attribution: false,
          rotate: false,
          zoom: false
        })
      });

      const marker = new Feature({
        geometry: new Point(
          olProj.fromLonLat(this.trail.location)
        )
      })

      var vectorSource = new VectorSource({
          features: [marker]
        });

      var markerVectorLayer = new VectorLayer({
          source: vectorSource,
        });

      this.map.addLayer(markerVectorLayer)
    }
  }

  ngOnChanges () {
    if (this.trail && this.map) {
      this.map.getView().setCenter(olProj.fromLonLat(this.trail.location))
    }
  }

}
