import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Router, ParamMap, ActivatedRoute, UrlSegment } from '@angular/router'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, OnDestroy {
  private routeSub: Subscription
  private isLoading: boolean
  private serverErr: string
  private model = {}
  private arrow = faArrowAltCircleRight
  private isLoginScreen: boolean
  private isFormReady = false

  private authStatusSub: Subscription
  private serverErrSub: Subscription

  constructor (
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit () {
    this.authStatusSub = this.authService.getAuthStatus$()
      .subscribe(
        authStatus =>
          this.isLoading = false
      )

    this.routeSub = this.route.url.subscribe((url: UrlSegment[]) => {
      this.isLoginScreen = url[0].path === 'login'
    })

    this.serverErrSub = this.authService.getAuthErr$()
      .subscribe(err => this.serverErr = err)
  }

  onSubmit (form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true
    if (this.isLoginScreen) {
      return this.authService.login(form.value.email, form.value.password)
    }

    this.authService.createUser({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy () {
    this.authStatusSub.unsubscribe()
    this.serverErrSub.unsubscribe()
    this.routeSub.unsubscribe()
  }
}
