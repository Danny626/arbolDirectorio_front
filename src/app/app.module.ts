import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { Ng2PanZoomModule } from 'ng2-panzoom';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArbolHorizontalComponent } from './pages/arbol-horizontal/arbol-horizontal.component';
import { PrimengModule } from './primeng/primeng.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    ArbolHorizontalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengModule,
    // Ng2PanZoomModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
