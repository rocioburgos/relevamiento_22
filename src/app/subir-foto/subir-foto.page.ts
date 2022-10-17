import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from   '@awesome-cordova-plugins/camera/ngx';
import { Photo } from '@capacitor/camera'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenesService } from '../servicios/imagenes.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.page.html',
  styleUrls: ['./subir-foto.page.scss'],
})
export class SubirFotoPage implements OnInit {

  
  @Input() titulo: string;
  mostrarError: boolean;
  habilitar: boolean;
  tipoImagenAsubir: string;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  paths: Array<string> = [];
  constructor(private router: Router,
    private camera: Camera,
    private imagenSrv: ImagenesService,
    private authSrv: AuthService,
    private spinner: NgxSpinnerService) {
    this.mostrarError = false;
    this.habilitar = false;
  }

  ngOnInit() {
    
    this.tomarFoto()
  }


  tipoImagenSet() {
    //levantar en localstorage
    let imagenJson = localStorage.getItem('tipoAsubir');
    if (imagenJson != null) {
      return (JSON.parse(imagenJson));
    } else {
      return null;
    }
  }

  subirFotos() { 
    this.spinner.show();
    let tipo = this.tipoImagenSet(); 
    let imagenesDoc = {
      'usuario': this.authSrv.getCurrentUserLS_email(),
      imagenes: this.paths, 
      fullDate: this.horario(),
      tipo: tipo.tipo,
      usuarios_like:[],
      cantidad_likes: 0
    };
    this.imagenSrv.saveDoc(imagenesDoc).then((data) => {

      tipo.tipo == 'linda' ? this.router.navigate(['cosaslindas']) : this.router.navigate(['cosasfeas']);
    
    }).catch(err => {
      this.spinner.hide()
      this.mostrarError = true;
      console.log(err)
    }).finally(()=>{
      this.spinner.hide()
    });
  }

  horario(): string {
    let date: Date = new Date();
 
    let fecha: string = date.getDate().toString() + '-' + (date.getMonth()+1).toString() + '-' + date.getFullYear().toString()
      + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString()+':'+
      date.getSeconds().toString()+':'+date.getMilliseconds().toString();
    return fecha;
  }

  tomarFoto() {
    this.addPhotoToGallery();
  }

  async addPhotoToGallery() {
    const photo = await this.imagenSrv.addNewToGallery();
    this.uploadPhoto(photo).then(() => {
      this.spinner.show();
     setTimeout(() => {
       this.habilitar = true;
      this.spinner.hide();
     }, 5000);
      
    }
    ).catch((err) => {
      this.spinner.hide();
      console.log("Error addPhotoToGallery", err);
    }) 
  }

  private async uploadPhoto(cameraPhoto: Photo) { 
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const filePath = this.getFilePath();

    const uploadTask = this.imagenSrv.saveFile(blob, filePath);

    uploadTask.then(async res => {
      const downloadURL = await res.ref.getDownloadURL();
      if (downloadURL.length > 0) {
        this.paths.push(downloadURL);

        this.paths.forEach(element => {

          console.log("Path imagen: " + element);
        });
      } else {
        console.log("IMAGEN NO CORRECTA  ");
      }
    })
      .catch((err) => {
        console.log("Error al subbir la imagen: ", err);
      });
  }

  getFilePath() {
    return new Date().getTime() + '-test';
  }

 

  cancelar(){
    this.router.navigateByUrl('home')
  }
}
