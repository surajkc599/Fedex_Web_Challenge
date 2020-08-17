import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AppFlexLayoutModule } from './flex-module/flex-layout.module';

import { FedexHttpInterceptor } from './http-interceptor/interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AppFlexLayoutModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FedexHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
