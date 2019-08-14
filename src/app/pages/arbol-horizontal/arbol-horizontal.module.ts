import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArbolHorizontalComponent } from './arbol-horizontal.component';
import { PrimengModule } from '../../primeng/primeng.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [ArbolHorizontalComponent],
  imports: [
    FormsModule,
    PrimengModule,
    PdfViewerModule
  ],
  providers: []
})
export class ArbolHorizontalModule {}
