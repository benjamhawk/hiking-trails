import { Component, OnInit, Input } from '@angular/core';
import { Trail } from 'src/app/models/trail.model';
import { getListPageMap, updateCenter } from 'src/app/utils/mapUtils';

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
      this.map = getListPageMap(this.trail.location)
    }
  }

  ngOnChanges () {
    if (this.trail && this.map) {
      this.map = updateCenter(this.trail.location, this.map)
    }
  }

}
