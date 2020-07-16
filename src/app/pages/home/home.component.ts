import { Component } from '@angular/core'
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

  constructor (private authService: AuthService) { }

  ngOnInit () {
    this.nameSub = this.authService.getName()
      .subscribe(name => {
        this.userName = name
      })
  }

  ngOnDestory () {
    this.nameSub.unsubscribe()
  }

}
