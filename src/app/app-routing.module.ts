import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { AuthGuard } from './auth/auth.guard'
import { TrailFormComponent } from './pages/trails/trail-form/trail-form.component'
import { TrailsListComponent } from './pages/trails/trails-list/trails-list.component'
import { TrailComponent } from './pages/trails/trail/trail.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'trails', component: TrailsListComponent },
  { path: 'trails/create', component: TrailFormComponent, canActivate: [AuthGuard] },
  { path: 'trails/:id', component: TrailComponent },
  { path: 'trails/edit/:id', component: TrailFormComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
