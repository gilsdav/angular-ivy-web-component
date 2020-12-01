//#region imports
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../chat.service';
//#endregion imports

@Component({
  selector: 'chat-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SubComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formValue: any;
  @Output() testEmitter = new EventEmitter<{value: string}>();

  private destroy$ = new Subject();

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        console.log('items from child', items);
      });
  }

  ngOnInit(): void {
    console.log('sub init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
  }

  ngOnDestroy(): void {
    console.log('destroy', this);
    this.destroy$.next();
    this.destroy$.complete();
  }

  public emitTest(): void {
    this.testEmitter.emit({ value: 'Hello from child' });
  }

}
