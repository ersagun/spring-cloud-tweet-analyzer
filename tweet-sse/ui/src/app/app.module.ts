import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { TweetComponent } from './tweet/tweet.component';
import {NgxGaugeModule} from "ngx-gauge";
import {SearchService} from "./service/search.service";


@NgModule({
  declarations: [
    AppComponent,
    TweetComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxGaugeModule
  ],
  providers: [
    SearchService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
