import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MyComponentComponent implements OnInit, OnChanges, OnDestroy {

  // private chatService: ChatService;

  @Input() formValue: any;
  @Output() testEmitter = new EventEmitter<{value: string}>();

  private destroy$ = new Subject();

  constructor(
    private chatService: ChatService
    // injector: Injector
  ) {
    // this.chatService = injector.get(ChatService);
    console.log(this.chatService);
    this.chatService.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        console.log('items from child', items);
      });
  }

  ngOnInit(): void {
    console.log('onInit', this);
    // console.log(this.chatService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    console.log('current', this.formValue);
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
