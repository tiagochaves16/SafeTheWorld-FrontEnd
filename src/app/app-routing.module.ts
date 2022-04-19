import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosComponent } from './components/enderecos/enderecos.component';

const routes: Routes = [{
  path: 'enderecos', component: EnderecosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
