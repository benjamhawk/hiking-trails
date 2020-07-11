import { Component, OnInit, OnDestroy } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { Trail } from 'src/app/models/trail.model'
import { Subscription } from 'rxjs'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-trails-list',
  templateUrl: './trails-list.component.html',
  styleUrls: ['./trails-list.component.scss']
})
export class TrailsListComponent implements OnInit, OnDestroy {
  postsPerPage = 4
  currentPage = 1
  totalTrails = 0
  isLoading = false
  currentHoverTrail: Trail
  trails: Trail[] = []

  viewMoreBtn = faAngleDoubleRight
  addBtn = faPlus

  private trailSub: Subscription

  constructor (private trailsService: TrailsService) { }

  ngOnInit () {
    this.trailsService.getTrails(this.postsPerPage, this.currentPage)
    this.trailSub = this.trailsService.getFetchedTrails()
      .subscribe((trailData: { trails: Trail[]; trailCount: number }) => {
        this.isLoading = false
        this.totalTrails = trailData.trailCount
        this.trails = trailData.trails
        if (this.trails.length > 0) {
          this.currentHoverTrail = this.trails[0]
        }
      })
  }

  onHover (trail: Trail) {
    this.currentHoverTrail = trail
  }

  ngOnDestroy () {
    this.trailSub.unsubscribe()
  }

}
