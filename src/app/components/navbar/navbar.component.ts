import { Component, OnInit, OnDestroy } from '@angular/core'
import { faMountain } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logo = faMountain
  userIsAuthenticated: boolean
  private authListenerSub: Subscription
  isMobileMenuShowing: boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSub = this.authService
      .getAuthStatus$()
      .subscribe(isAutheticated => {
        this.userIsAuthenticated = isAutheticated
      })
  }

  onLogout() {
    this.authService.logout()
    this.toggleMobileMenu()
  }

  toggleMobileMenu() {
    this.isMobileMenuShowing = !this.isMobileMenuShowing
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe()
  }
}
