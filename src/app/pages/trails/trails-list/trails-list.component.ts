import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { Trail } from 'src/app/models/trail.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-trails-list',
  templateUrl: './trails-list.component.html',
  styleUrls: ['./trails-list.component.scss']
})
export class TrailsListComponent implements OnInit, OnDestroy {
  private postsPerPage = 4
  private currentPage = 1
  private totalTrails = 0
  private isLoading = false
  private trails: Trail[] = []

  private trailSub: Subscription

  constructor (private trailsService: TrailsService) { }

  ngOnInit () {
    this.trailsService.getTrails(this.postsPerPage, this.currentPage)
    this.trailSub = this.trailsService.getFetchedTrails()
      .subscribe((trailData: { trails: Trail[]; trailCount: number }) => {
        this.isLoading = false
        this.totalTrails = trailData.trailCount
        this.trails = trailData.trails
      })
  }

  ngOnDestroy () {
    this.trailSub.unsubscribe()
  }

}
