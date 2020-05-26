import { Component, OnInit } from '@angular/core'
import { TrailsService } from 'src/app/services/trails.service'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Trail } from 'src/app/models/trail.model'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {
  private routeSub: Subscription
  private trailId: string
  private trail: Trail
  private isEditMode: boolean

  constructor (
    private trailsService: TrailsService,
    private route: ActivatedRoute,
    private router: Router
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
  }
  ngOnDestroy () {
    this.routeSub.unsubscribe()
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
        location: [form.value.latitude, form.value.longitude]
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

}
