import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirFotoPageRoutingModule } from './subir-foto-routing.module';

import { SubirFotoPage } from './subir-foto.page';
import { NgxSpinnerModule } from "ngx-spinner";  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirFotoPageRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [SubirFotoPage]
})
export class SubirFotoPageModule {}
