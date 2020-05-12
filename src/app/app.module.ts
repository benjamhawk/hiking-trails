import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { CampgroundCardComponent } from './components/campground-card/campground-card.component'
import { TrailsCreateComponent } from './pages/trails/trails-create/trails-create.component'
import { FormsModule } from '@angular/forms'
import { AuthInterceptor } from './auth/auth-interceptor'
import { checkCoordinatesValidatorDirective } from './utils/custom-validators/checkCoordinates'
import { TrailsListComponent } from './pages/trails/trails-list/trails-list.component'
import { TrailComponent } from './pages/trails/trail/trail.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CampgroundCardComponent,
    TrailsCreateComponent,
    TrailsListComponent,
    checkCoordinatesValidatorDirective,
    TrailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
