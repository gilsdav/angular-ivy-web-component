import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class ChatService {

  private list$ = new BehaviorSubject(['elem1', 'elem2']);

  constructor() {
    setTimeout(() => {
      this.list$.next(['elem3', 'elem4']);
      console.log(this.list$.getValue());
    }, 3000);
  }

  public getItems(): Observable<string[]> {
    return this.list$.asObservable();
  }

}
