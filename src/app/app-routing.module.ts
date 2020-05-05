import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { CampgroundsComponent } from './pages/campgrounds/campgrounds.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'campgrounds', component: CampgroundsComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
