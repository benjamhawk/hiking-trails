import { Component, OnInit } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'
import { Trail } from 'src/app/models/trail.model'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {
  private routeSub: Subscription
  private authSub: Subscription
  private trailId: string
  private trail: Trail
  private userId: string

  constructor (
    private trailsService: TrailsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit () {
    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.trailId = paramMap.get('id')
      this.trailsService.getTrail(this.trailId)
        .subscribe(trail => this.trail = trail)
    })

    this.authSub = this.authService.getUserId()
      .subscribe(id => this.userId = id)
  }

  onDelete () {
    this.trailsService.deleteTrail(this.trailId)
  }

  ngOnDestroy () {
    this.routeSub.unsubscribe()
    this.authSub.unsubscribe()
  }
}
