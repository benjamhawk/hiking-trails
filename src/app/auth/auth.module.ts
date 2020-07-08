import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AuthRoutingModule } from './auth-routing.module'
import { PasswordsUnequalValidatorDirective } from '../utils/custom-validators/checkPasswords'
import { AuthFormComponent } from './auth-form/auth-form.component'

@NgModule({
  declarations: [
    AuthFormComponent,
    PasswordsUnequalValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    FontAwesomeModule
  ]
})
export class AuthModule { }
