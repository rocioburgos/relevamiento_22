import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AngularFireModule } from "@angular/fire/compat"; 
import { environment } from '../environments/environment'; 
import { CommonModule } from '@angular/common'; 


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NgChartsModule } from 'ng2-charts';
import {  ThemeService } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FechaPipe } from './pipes/fecha.pipe';
@NgModule({
  
  declarations: [AppComponent, FechaPipe],
  imports: [
    BrowserModule,
    CommonModule ,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NgxSpinnerModule, 
    NgChartsModule, 
    NgxChartsModule, 
     
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, ThemeService],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
