import { Directive, forwardRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector:
    // tslint:disable-next-line: directive-selector
    'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(input)': '$any(this)._handleInput($event.target.value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': '$any(this)._compositionStart()',
    '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyDefaultValueAccessor),
    multi: true
  }]
})
// tslint:disable-next-line: directive-class-suffix
export class MyDefaultValueAccessor extends DefaultValueAccessor {

  public writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    // @ts-ignore
    this._elementRef.nativeElement.setAttribute('value', normalizedValue);
    // this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  public setDisabledState(isDisabled: boolean): void {
    // @ts-ignore
    const elem = this._elementRef.nativeElement;
    if (isDisabled) {
      elem.setAttribute('disabled', 'disabled');
    } else {
      elem.removeAttribute('disabled');
    }

  }


}
