import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean
  serverErr: string
  model = {}

  private authStatusSub: Subscription
  private serverErrSub: Subscription

  constructor (private authService: AuthService) { }

  ngOnInit () {
    this.authStatusSub = this.authService.getAuthStatus$()
      .subscribe(
        authStatus =>
          this.isLoading = false
      )

    this.serverErrSub = this.authService.getLoginErr$()
        .subscribe(err => this.serverErr = err)
  }

  onLogin (form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true
    this.authService.login(form.value.email, form.value.password)
  }

  ngOnDestroy () {
    this.authStatusSub.unsubscribe()
    this.serverErrSub.unsubscribe()
  }
}
