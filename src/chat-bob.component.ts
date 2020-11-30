import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgForOf, NgIf, JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';

import { renderCustomElement } from 'ngx-elements';

import { MyDefaultValueAccessor } from './utils/my-default-value-accessor.directive';
import { CustomAsyncPipe } from './utils/custom-async.pipe';
import { refreshViewOnChanges } from './utils/refresh-view-on-change.operator';

import { ChatService } from './chat.service';
import { MyComponentComponent } from './my-component/my-component.component';


const module = {
  components: [
    MyComponentComponent
  ],
  directives: [
    NgForOf,
    NgIf,
    FormGroupDirective,
    FormControlName,
    MyDefaultValueAccessor
  ],
  pipes: [
    JsonPipe,
    // AsyncPipe
    CustomAsyncPipe
  ],
  providers: [
    // ChatService,
    FormBuilder
  ]
};


@Component({
  selector: 'app-chat-bob',
  templateUrl: './chat-bob.component.html',
  styleUrls: ['./chat-bob.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: module.providers
})
export class ChatBobComponent implements OnInit, OnChanges {

  // private chatService: ChatService;

  @Input() bob: string;

  public list$: Observable<string[]>;
  public form: FormGroup;
  public formValue: any;

  constructor(
    // injector: Injector
    private chatService: ChatService,
    fb: FormBuilder
  ) {
    // const fb: FormBuilder = injector.get(FormBuilder);
    // console.log(fb);
    this.form = fb.group({
      test: fb.control('', Validators.required)
    });
    this.form.valueChanges.pipe(
      refreshViewOnChanges(this)
    ).subscribe(value => this.formValue = {...value});
    // this.chatService = injector.get(ChatService);
    // console.log(this.chatService);
  }

  ngOnInit(): void {
    this.list$ = this.chatService.getItems();
    setTimeout(() => {
      this.form.get('test').setValue('Hello');
    }, 2000);
    console.log(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  public testEmitted(value: any): void {
    console.log('testEmitted', value);
  }

}

// console.log(ChatBobComponent['ɵcmp']);
// console.log(NgForOf['ɵdir']);
// console.log(JsonPipe['ɵpipe']);

renderCustomElement(ChatBobComponent, {
  directives: [...module.directives, ...module.components],
  pipes: module.pipes,
  /*injector: Injector.create({
    providers: [
      {
        provide: ChatService,
        useClass: ChatService
      },
      {
        provide: FormBuilder,
        useClass: FormBuilder
      }
    ],
    name: 'root'
  })*/
});
