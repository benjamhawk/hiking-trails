import { Component, OnInit, Input } from '@angular/core'
import { Trail } from 'src/app/models/trail.model'
import { getListPageMap, updateCenter } from 'src/app/utils/mapUtils'

@Component({
  selector: 'app-trail-list-map',
  templateUrl: './trail-list-map.component.html',
  styleUrls: ['./trail-list-map.component.scss']
})
export class TrailListMapComponent implements OnInit {
  private map
  @Input() trail: Trail

  constructor() {}

  ngOnInit() {
    if (this.trail) {
      this.map = getListPageMap(this.trail.location)
    }
  }

  ngOnChanges() {
    if (this.trail && this.map) {
      this.map = updateCenter(this.trail.location, this.map)
    }
  }
}
