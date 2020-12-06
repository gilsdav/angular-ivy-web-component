//#region imports
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgForOf, NgIf, JsonPipe, AsyncPipe } from '@angular/common';
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
import { SubComponent } from './sub/sub.component';
//#endregion imports

const module = {
  components: [
    SubComponent
  ],
  directives: [
    NgForOf,
    NgIf,
    // FormGroupDirective,
    // FormControlName,
    // MyDefaultValueAccessor
  ],
  pipes: [
    JsonPipe,
    // AsyncPipe
    CustomAsyncPipe
  ],
  providers: [
    FormBuilder
  ]
};


@Component({
  selector: 'chat-bob',
  templateUrl: './chat-bob.component.html',
  styleUrls: ['./chat-bob.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: module.providers
})
export class ChatBobComponent implements OnInit, OnChanges {

  @Input() bob: string;

  public list$: Observable<string[]>;
  public form: FormGroup;
  public formValue: any;

  constructor(
    private chatService: ChatService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      test: fb.control('', Validators.required)
    });
    this.form.valueChanges.pipe(
      // refreshViewOnChanges(this)
    ).subscribe(value => this.formValue = {...value});
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

renderCustomElement(ChatBobComponent, {
  directives: [...module.directives, ...module.components],
  pipes: module.pipes
});
