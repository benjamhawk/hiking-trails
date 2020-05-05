import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthRoutingModule } from './auth-routing.module'
import { PasswordsUnequalValidatorDirective } from '../utils/custom-validators/checkPasswords'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordsUnequalValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
