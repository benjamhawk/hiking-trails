import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthFormComponent } from './auth-form/auth-form.component'

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: 'register', component: AuthFormComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
