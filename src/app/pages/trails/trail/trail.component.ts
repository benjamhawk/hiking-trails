import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'
import { Trail } from 'src/app/models/trail.model'
import { AuthService } from 'src/app/auth/auth.service'
import {} from 'googlemaps'

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any
  map: google.maps.Map
  routeSub: Subscription
  authSub: Subscription
  trailId: string
  trail: Trail
  userId: string
  isCreator: boolean

  constructor(
    private trailsService: TrailsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.trailId = paramMap.get('id')
      this.trailsService.getTrail(this.trailId).subscribe(trail => {
        this.trail = trail

        const mapProperties = {
          center: new google.maps.LatLng(
            this.trail.location[1],
            this.trail.location[0]
          ),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapProperties
        )

        const marker = new google.maps.Marker({
          position: {
            lat: this.trail.location[1],
            lng: this.trail.location[0]
          },
          map: this.map
        })
      })
    })

    this.authSub = this.authService.getUserId().subscribe(id => {
      this.userId = id
    })
  }

  onDelete() {
    this.trailsService.deleteTrail(this.trailId)
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
    this.authSub.unsubscribe()
  }
}
