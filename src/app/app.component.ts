import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'campgrounds'
  isHomePage = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoAuthUser()

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/home') {
          this.isHomePage = true
        } else {
          this.isHomePage = false
        }
      }
    })
  }
}
