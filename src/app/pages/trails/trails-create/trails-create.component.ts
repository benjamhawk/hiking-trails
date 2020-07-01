import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms'
import { TrailsService } from 'src/app/services/trails.service'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-trails-create',
  templateUrl: './trails-create.component.html',
  styleUrls: ['./trails-create.component.scss']
})
export class TrailsCreateComponent implements OnInit {
  isLoading: boolean
  model = {}
  serverErr: string
  userId: string

  serverErrSub: Subscription
  userIdSub: Subscription

  constructor (private trailsService: TrailsService, private authService: AuthService) { }

  ngOnInit () {
    this.serverErrSub = this.trailsService.getErr()
      .subscribe(err => {
        this.serverErr = err
      })
    
    this.userIdSub = this.authService.getUserId()
      .subscribe(id => this.userId = id)
  }

  onSubmit (form: NgForm) {
    if (form.invalid) return

    this.trailsService.createTrail({
      name: form.value.name,
      preview: form.value.preview,
      description: form.value.description,
      image: form.value.image,
      location: [form.value.longitude, form.value.latitude],
      creator: this.userId
    })
  }

  ngOnDestroy () {
    this.serverErrSub.unsubscribe()
  }

}
