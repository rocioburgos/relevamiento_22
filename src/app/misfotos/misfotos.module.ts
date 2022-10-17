import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisfotosPageRoutingModule } from './misfotos-routing.module';

import { MisfotosPage } from './misfotos.page';

import { NgxSpinnerModule } from "ngx-spinner"; 
import { FechaPipe } from '../pipes/fecha.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisfotosPageRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [MisfotosPage,FechaPipe]
})
export class MisfotosPageModule {}
