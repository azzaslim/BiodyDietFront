import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
  if (formGroup.get('password')!.value === formGroup.get('password2')!.value)
    return null;

  else
    return { passwordMismatch: true };
}