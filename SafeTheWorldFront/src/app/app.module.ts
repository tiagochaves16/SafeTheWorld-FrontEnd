import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { EnderecosService } from './enderecos.service';

import { HttpClientModule } from '@angular/common/http'

import {ModalModule} from "ngx-bootstrap/modal"


import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';

@NgModule({
  declarations: [
    AppComponent,
    EnderecosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, EnderecosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
