import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [],
  imports: [
    TreeModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SidebarModule,
    TableModule
  ],
  exports: [
    TreeModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SidebarModule,
    TableModule
  ],
  providers: [ConfirmationService]
})
export class PrimengModule {}
