import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Ng2PanZoomModule } from 'ng2-panzoom';
import {
  ButtonModule,
  ContextMenuModule,
  DialogModule,
  ScrollPanelModule,
  TreeModule
} from 'primeng/primeng';
// import { PrimengModule } from '../../primeng/primeng.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    // Ng2PanZoomModule,
    DialogModule,
    ButtonModule,
    ContextMenuModule
    // PrimengModule,
  ],
  providers: []
})
export class ArbolHorizontalModule {}
