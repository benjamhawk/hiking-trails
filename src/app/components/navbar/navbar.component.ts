import { Component, OnInit, OnDestroy } from '@angular/core'
import { faCampground } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logo = faCampground
  userIsAuthenticated: boolean
  private authListenerSub: Subscription

  constructor (private authService: AuthService) { }

  ngOnInit () {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSub = this.authService
      .getAuthStatus$()
      .subscribe(isAutheticated => {
        this.userIsAuthenticated = isAutheticated
      })
  }

  onLogout () {
    this.authService.logout()
  }

  ngOnDestroy () {
    this.authListenerSub.unsubscribe()
  }

}
