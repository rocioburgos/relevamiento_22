import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosaslindasPageRoutingModule } from './cosaslindas-routing.module';

import { CosaslindasPage } from './cosaslindas.page';

import { NgxSpinnerModule } from "ngx-spinner";  
import { FechaPipe } from '../pipes/fecha.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosaslindasPageRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [CosaslindasPage, FechaPipe]
})
export class CosaslindasPageModule {}
