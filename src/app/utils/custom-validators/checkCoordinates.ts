import { Directive } from '@angular/core'
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms'

export const checkCoordinatesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const lat = control.get('latitude')
  const long = control.get('longitude')
  if (lat && long) {
    return lat.value < -90 || lat.value > 90 || long.value < -180 || long.value > 180 ? { 'invalidCoordinates': true } : null
  } else {
    return null
  }
}

@Directive({
  selector: '[appCheckCoordinates]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: checkCoordinatesValidatorDirective,
    multi: true
  }]
})

export class checkCoordinatesValidatorDirective implements Validator {
  validate (control: AbstractControl): ValidationErrors {
    return checkCoordinatesValidator(control)
  }
}