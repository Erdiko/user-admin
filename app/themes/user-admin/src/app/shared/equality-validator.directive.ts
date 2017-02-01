import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEquality][formControlName],[validateEquality][formControl],[validateEquality][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualityValidator), multi: true }
    ]
})
export class EqualityValidator implements Validator {
    constructor( @Attribute('validateEquality') public validateEquality: string) {}

    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let v = c.value;

        // control value (e.g. password)
        let e = c.parent.controls[this.validateEquality];

        // value not equal
        if (e && v !== e.value) return {
            validateEquality: false
        }
        return null;
    }
}
