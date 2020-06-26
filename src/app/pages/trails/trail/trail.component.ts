import { Component, OnInit } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Trail } from 'src/app/models/trail.model'
import { NgForm } from '@angular/forms'
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
  private trail: any
  private isEditMode: boolean
  private userId: string

  constructor (
    private trailsService: TrailsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit () {
    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.trailId = paramMap.get('id')
      this.trailsService.getTrail(this.trailId)
        .subscribe(trail => {
          this.trail = trail
          console.log(trail)
        })
    })

    this.authSub = this.authService.getUserId()
      .subscribe(id => this.userId = id)
  }

  onDelete () {
    this.trailsService.deleteTrail(this.trailId)
  }

  onSave (form: NgForm) {
    if (form.invalid) return

    this.trailsService.updateTrail(
      this.trailId,
      {
        name: form.value.name,
        description: form.value.description,
        image: form.value.image,
        location: [form.value.longitude, form.value.latitude],
        creator: this.trail.creator
      })
      .subscribe(
        data => {
          this.isEditMode = false
        },
        error => {
          console.log(error)
        }
      )
  }

  onEdit () {
    this.isEditMode = true
  }

  ngOnDestroy () {
    this.routeSub.unsubscribe()
    this.authSub.unsubscribe()
  }
}
