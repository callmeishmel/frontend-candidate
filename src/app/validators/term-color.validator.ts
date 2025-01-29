import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator: Ensure either 'name' or 'color' is provided
export function termOrColorValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const term = String(formGroup.get('term')?.value || '').trim();
    const color = String(formGroup.get('color')?.value || '').trim();

    // Valid if at least one field is non-empty
    return term || color ? null : { termOrColorRequired: true };
  };
}
