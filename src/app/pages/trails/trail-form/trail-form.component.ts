import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms'
import { TrailsService } from 'src/app/services/trails.service'
import { AuthService } from 'src/app/auth/auth.service'
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { Trail } from 'src/app/models/trail.model'
import { defaultTrail } from 'src/assets/defaultData/defaultTrail'
import { stateArr } from '../../../utils/stateArr'

@Component({
  selector: 'app-trail-form',
  templateUrl: './trail-form.component.html',
  styleUrls: ['./trail-form.component.scss']
})
export class TrailFormComponent implements OnInit {
  isLoading: boolean
  userId: string
  isEditMode: boolean
  trailId: string
  trail = defaultTrail
  stateArr = stateArr
  error: string

  private serverErrSub: Subscription
  private userIdSub: Subscription
  private routeSub: Subscription

  constructor(
    private trailsService: TrailsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userIdSub = this.authService
      .getUserId()
      .subscribe(id => (this.userId = id))

    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.trailId = paramMap.get('id')

      if (this.trailId) {
        this.isEditMode = true
        this.trailsService.getTrail(this.trailId).subscribe(trail => {
          this.trail = trail
        })
      }
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return

    this.trailsService
      .fetchCoordinates(form.value.city, form.value.state)
      .subscribe(
        (coordinates: any) => {
          if (this.isEditMode) {
            this.trailsService
              .updateTrail(this.trailId, {
                name: form.value.name,
                preview: form.value.preview,
                description: form.value.description,
                image: form.value.image,
                city: form.value.city,
                state: form.value.state,
                location: [coordinates.lng, coordinates.lat],
                creator: this.trail.creator
              })
              .subscribe(
                data => {
                  this.router.navigate(['/trails'])
                  form.resetForm()
                },
                error => {
                  console.log(error)
                }
              )
          } else {
            this.trailsService
              .createTrail({
                name: form.value.name,
                preview: form.value.preview,
                description: form.value.description,
                image: form.value.image,
                city: form.value.city,
                state: form.value.state,
                location: [coordinates.lng, coordinates.lat],
                creator: this.userId
              })
              .subscribe(
                success => {
                  this.router.navigate(['/trails'])
                  form.resetForm()
                },
                error => {
                  console.log(error)
                }
              )
          }
        },
        err => {
          this.error = 'Cannot find entered location. Please try again.'
        }
      )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
    this.userIdSub.unsubscribe()
  }
}
