import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForOf, JsonPipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { renderCustomElement } from 'ngx-elements';

// import { AppRef } from './app-ref';
import { ChatService } from './chat.service';
import { refreshViewOnChanges } from './refresh-view-on-change.operator';
// import { CustomAsyncPipe } from './custom-async.pipe';

@Component({
  selector: 'app-chat-bob',
  templateUrl: './chat-bob.component.html',
  styleUrls: ['./chat-bob.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    ChatService
  ]
})
export class ChatBobComponent implements OnInit {

  public list$: Observable<string[]>;

  constructor(private chatService: ChatService) {
    // AppRef.ref = this;
  }

  ngOnInit(): void {
    this.list$ = this.chatService.getItems().pipe(
      refreshViewOnChanges(this)
    );
  }

}

console.log(ChatBobComponent['ɵcmp']);
console.log(NgForOf['ɵdir']);
console.log(JsonPipe['ɵpipe']);

renderCustomElement(ChatBobComponent, {
  directives: [ NgForOf ],
  pipes: [ JsonPipe, AsyncPipe /*CustomAsyncPipe*/ ]
});
