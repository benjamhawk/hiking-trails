import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CampgroundsComponent } from './pages/campgrounds/campgrounds.component'
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CampgroundsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
