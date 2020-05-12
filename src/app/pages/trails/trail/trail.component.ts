import { Component, OnInit } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'
import { Trail } from 'src/app/models/trail.model'

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {
  private routeSub: Subscription
  private trailId: string
  private trail: Trail
  constructor (
    private trailsService: TrailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.trailId = paramMap.get('id')
      this.trailsService.getTrail(this.trailId)
        .subscribe(trail => this.trail = trail)
    })
  }
  ngOnDestroy () {
    this.routeSub.unsubscribe()
  }

}
