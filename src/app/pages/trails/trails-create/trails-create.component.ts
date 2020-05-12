import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms'
import { TrailsService } from 'src/app/services/trails.service'

@Component({
  selector: 'app-trails-create',
  templateUrl: './trails-create.component.html',
  styleUrls: ['./trails-create.component.scss']
})
export class TrailsCreateComponent implements OnInit {
  isLoading: boolean
  model = {}
  serverErr: string

  serverErrSub: Subscription

  constructor (private trailsService: TrailsService) { }

  ngOnInit () {
    this.serverErrSub = this.trailsService.getErr()
      .subscribe(err => {
        this.serverErr = err
      })
  }

  onSubmit (form: NgForm) {
    if (form.invalid) return

    this.trailsService.createTrail({
      name: form.value.name,
      description: form.value.description,
      image: form.value.image,
      location: [form.value.latitude, form.value.longitude]
    })
  }

  ngOnDestroy () {
    this.serverErrSub.unsubscribe()
  }

}
