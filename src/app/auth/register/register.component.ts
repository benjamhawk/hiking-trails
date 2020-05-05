import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean
  model = {}
  serverErr: string

  private authStatusSub: Subscription
  private serverErrSub: Subscription

  constructor (private authService: AuthService) { }

  ngOnInit () {
    this.authStatusSub = this.authService.getAuthStatus$()
      .subscribe(i => this.isLoading = false)

    this.serverErrSub = this.authService.getSignupErr$()
      .subscribe(err => this.serverErr = err)
  }

  onSignup (form: NgForm) {
    if (form.invalid) return

    this.isLoading = true
    this.authService.createUser({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy () {
    this.authStatusSub.unsubscribe()
  }
}
