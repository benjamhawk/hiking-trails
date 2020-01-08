import { Injectable } from '@angular/core'
import { Theme, light, dark } from './theme'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  activeTheme: Theme = light

  getActiveTheme (): Theme {
    return this.activeTheme
  }

  setDarkTheme (): void {
    this.setActiveTheme(dark)
  }

  setLightTheme (): void {
    this.setActiveTheme(light)
  }

  private setActiveTheme (theme: Theme): void {
    this.activeTheme = theme

    Object.keys(this.activeTheme.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.activeTheme.properties[property]
      )
    })
  }
}
