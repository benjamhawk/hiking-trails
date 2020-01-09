import { Component, OnInit } from '@angular/core'
import { faCampground } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logo = faCampground

  constructor() { }

  ngOnInit() {
  }

}
