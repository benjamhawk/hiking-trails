import { Component } from '@angular/core'
import { ThemeService } from 'src/app/theme/theme.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor (private themeService: ThemeService) { }

  toggleTheme () {
    this.themeService.getActiveTheme().name === 'dark'
      ? this.themeService.setLightTheme()
      : this.themeService.setDarkTheme()
  }

}
