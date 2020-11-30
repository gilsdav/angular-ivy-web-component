import { ɵdetectChanges as detectChanges } from '@angular/core';
import { tap } from 'rxjs/operators';

export const refreshViewOnChanges = <T>(cmpt) => {
    return tap<T>(() => {
      setTimeout(() => {
        detectChanges(cmpt);
      });
    });
};
