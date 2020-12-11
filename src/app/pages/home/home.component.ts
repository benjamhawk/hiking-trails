import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { TrailsService } from 'src/app/services/trails.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName

  private nameSub: Subscription

  constructor(private trailsService: TrailsService) {}

  ngOnInit() {
    // this api call serves no purpose other than to wake up the heroku
    // api server when a visior visits the homepage
    this.trailsService.getTrails(4, 1)
  }

  ngOnDestory() {
    this.nameSub.unsubscribe()
  }
}
