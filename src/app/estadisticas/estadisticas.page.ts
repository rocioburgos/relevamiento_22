import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImagenesService } from '../servicios/imagenes.service';
import { single } from './data';
import { single_barras } from './data_barras';
import { CheckboxCustomEvent } from '@ionic/angular';
import { NgxSpinnerService } from "ngx-spinner";


class fotoFire {
  cantidad_likes: number;
  fecha: string;
  fullDate: any;
  hora: string;
  imagenes: string[];
  tipo: string;
  usuario: string;
  usuarios_like: string[];
}
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  view:any[];
  //datos
  single: any[] = []; 
  fotos_lindas: any;
  // options
  gradient: boolean = true;
  showLegend: boolean = false; 
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  //colores
  colorScheme = {
    domain: ['#b567e9', '#ff3f98', '#ff5457', '#0080ff']
  };

  /***************************modal  */
  canDismiss = false;

  presentingElement = null;
  showModal: boolean = false;
  showSpinner: boolean = false;
  showLabels:boolean= true;
  foto_modal: fotoFire;
  /*************** */
  estadisticaMostrar: string = 'linda';



  /************GRAFICO DE BARRAS */
  single_barras: any[] = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient_barras = false;
  showLegend_barras = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  fotos_feas: any;
  colorScheme_barras = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private imagenesSrv: ImagenesService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.view = [innerWidth / 1.3, 400];
    this.spinner.show();
    this.imagenesSrv.getImagenes('linda').subscribe((res) => {
      res.forEach(foto => {
        if (foto.cantidad_likes > 0) {
          this.fotos_lindas = res;
          single.push(
            {
              "name": foto.doc_id,
              "value": foto.cantidad_likes
            }
          );
        }
      })
    });


     this.imagenesSrv.getImagenes('feas').subscribe((x) => {
      x.forEach(F => {
        if (F.cantidad_likes > 0) {
          this.fotos_feas = x;
          single_barras.push(
            {
              "name": F.doc_id,
              "value": F.cantidad_likes
            }
          );
        }
      })
    });
 

    this.foto_modal = new fotoFire();
    this.foto_modal.cantidad_likes = 0;
    this.foto_modal.fecha = '';
    this.foto_modal.fullDate = '';
    this.foto_modal.hora = '';
    this.foto_modal.imagenes = [];
    this.foto_modal.tipo = '';
    this.foto_modal.usuario = '';
    this.foto_modal.usuarios_like = [];
    this.presentingElement = document.querySelector('.ion-page');

    setTimeout(() => {
      Object.assign(this, { single });
      Object.assign(this, { single_barras });
      this.spinner.hide();
    }, 5000);


  }

  // view is the variable used to change the chart size (Ex: view = [width, height])

onResize(event) {
  this.view = [event.target.innerWidth / 1.35, 400];
}
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.showModal = true;
    this.showSpinner = true;
    if (this.estadisticaMostrar == 'linda') {
      this.fotos_lindas.forEach((foto: any) => {
        if (foto.doc_id == data.name) {
          console.log(foto.imagenes)
          this.foto_modal = foto;

        }
      });
    }else{
      this.fotos_feas.forEach(element => {
        if (element.doc_id == data.name) {
          console.log(element.imagenes)
          this.foto_modal = element;

        }
      });
    }

    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }


  hideModal() {
    this.showModal = false;
  }

  checkValue(event: any) {
    console.log(event.detail.value)
    this.estadisticaMostrar = event.detail.value;
  }
}
