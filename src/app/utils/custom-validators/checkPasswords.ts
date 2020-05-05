import { Directive } from '@angular/core'
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

export const passwordsUnequalValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const p1 = control.get('password')
  const p2 = control.get('passwordConfirmation')

  return p1 && p2 && p1.value !== p2.value ? { 'passwordsUnequal': true } : null
}

@Directive({
  selector: '[appPasswordsUnequal]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordsUnequalValidatorDirective,
    multi: true
  }]
})

export class PasswordsUnequalValidatorDirective implements Validator {
  validate (control: AbstractControl): ValidationErrors {
    return passwordsUnequalValidator(control)
  }
}
