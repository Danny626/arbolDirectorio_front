import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArbolHorizontalModule } from './pages/arbol-horizontal/arbol-horizontal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ArbolHorizontalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
