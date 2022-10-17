import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosaslindasPage } from './cosaslindas.page';

const routes: Routes = [
  {
    path: '',
    component: CosaslindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosaslindasPageRoutingModule {}
