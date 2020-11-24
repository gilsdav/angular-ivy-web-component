import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Pipe({
  name: 'async',
  pure: false
})
export class CustomAsyncPipe extends AsyncPipe implements PipeTransform {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  // @ts-ignore
  // tslint:disable-next-line: variable-name
  protected _updateLatestValue(async: any, value: any): void {
    // @ts-ignore
    super._updateLatestValue(async, value);
    // @ts-ignore
    if (async === this._obj) {
      console.log('_updateLatestValue');
      this.ref.detectChanges();
    }
  }

}
