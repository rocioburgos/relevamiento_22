import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasfeasPage } from './cosasfeas.page';

const routes: Routes = [
  {
    path: '',
    component: CosasfeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasfeasPageRoutingModule {}
