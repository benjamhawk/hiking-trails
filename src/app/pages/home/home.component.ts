import { Component } from '@angular/core'
import { ThemeService } from 'src/app/theme/theme.service'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName

  private nameSub: Subscription

  constructor (private themeService: ThemeService, private authService: AuthService) { }

  ngOnInit () {
    this.nameSub = this.authService.getName()
      .subscribe(name => {
        this.userName = name
      })
  }

  toggleTheme () {
    this.themeService.getActiveTheme().name === 'dark'
      ? this.themeService.setLightTheme()
      : this.themeService.setDarkTheme()
  }

  ngOnDestory () {
    this.nameSub.unsubscribe()
  }

}
