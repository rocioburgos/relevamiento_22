import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasfeasPageRoutingModule } from './cosasfeas-routing.module';

import { CosasfeasPage } from './cosasfeas.page';
import { NgxSpinnerModule } from "ngx-spinner";  
import { FechaPipe } from '../pipes/fecha.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasfeasPageRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [CosasfeasPage, FechaPipe]
})
export class CosasfeasPageModule {}
