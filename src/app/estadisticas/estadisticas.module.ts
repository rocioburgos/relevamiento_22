import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';
import { NgChartsModule } from 'ng2-charts'; 
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from "ngx-spinner";  
import { FechaPipe } from '../pipes/fecha.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EstadisticasPageRoutingModule,
    NgChartsModule, 
    NgxChartsModule ,
    NgxSpinnerModule
  ],
  declarations: [EstadisticasPage, FechaPipe]
})
export class EstadisticasPageModule {}
