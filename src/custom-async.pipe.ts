import { Pipe, PipeTransform, ChangeDetectorRef, ɵdetectChanges as detectChanges, ElementRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AppRef } from './app-ref';

@Pipe({
  name: 'async',
  pure: false
})
export class CustomAsyncPipe extends AsyncPipe implements PipeTransform {

  constructor(ref: ChangeDetectorRef) {
    super(ref);
    // @ts-ignore
    this._updateLatestValue = (async: any, value: any) => {
      // @ts-ignore
      super._updateLatestValue(async, value);
      // @ts-ignore
      if (async === this._obj) {
        console.log('_updateLatestValue');
        detectChanges(AppRef.ref);
      }
    };
  }

}
