import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TreeModule,
  TabViewModule,
  ScrollPanelModule,
  DialogModule,
  ButtonModule,
  ConfirmDialogModule,
  ContextMenuModule,
  SidebarModule
} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TreeModule,
    TabViewModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SidebarModule,
    TableModule
  ],
  exports: [
    TreeModule,
    TabViewModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SidebarModule,
    TableModule
  ],
  providers: [ConfirmationService],
})
export class PrimengModule {}
