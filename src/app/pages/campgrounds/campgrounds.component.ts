import { Component } from '@angular/core'
import { CampgroundsService } from 'src/app/services/campgrounds.service'
import { Campground } from 'src/app/models/camground.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-campgrounds',
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.scss']
})
export class CampgroundsComponent {
  campgrounds: Campground[]
  campgroundsSubscription: Subscription

  constructor (private campgroundsService: CampgroundsService) {}

  ngOnInit () {
    this.campgroundsSubscription = this.campgroundsService.getCampgrounds()
      .subscribe(campgrounds => {
        this.campgrounds = campgrounds
      })
  }

  ngOnDestroy () {
    this.campgroundsSubscription.unsubscribe()
  }
}
