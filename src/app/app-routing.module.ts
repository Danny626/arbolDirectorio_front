import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbolHorizontalComponent } from './pages/arbol-horizontal/arbol-horizontal.component';

const routes: Routes = [
  { path: 'arbolHorizontal', component: ArbolHorizontalComponent },
  { path: '', redirectTo: 'arbolHorizontal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
