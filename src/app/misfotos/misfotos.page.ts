import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../servicios/auth.service';
import { ImagenesService } from '../servicios/imagenes.service';

@Component({
  selector: 'app-misfotos',
  templateUrl: './misfotos.page.html',
  styleUrls: ['./misfotos.page.scss'],
})
export class MisfotosPage implements OnInit {
 
  contact: Array<Object>;
  usuario_email:any;
  tieneFotos:boolean ;
  constructor(
    private router:Router ,
    private imagenSrv:ImagenesService 
    ,private spinner: NgxSpinnerService
    , private authSrv:AuthService
    ) { }


  ngOnInit() {
    this.spinner.show();
    this.usuario_email= (this.authSrv.getCurrentUserLS()).email;
   this.obtenerImagenes();
  
    setTimeout(() => {
      this.spinner.hide(); 

    }, 3000); 
  } 

  obtenerImagenes(){  
    //Traigo productos  
    let email= this.usuario_email;
    this.imagenSrv.getImagenesByUser(email).subscribe( data => {
      if(data.length ==0){
        console.log('error, no tiene fotos')
        
      }else{

        this.contact =  data; 

        data.forEach((foto: any) => { 
          if (this.estaLikeada(foto.doc_id)==true) {
            foto.like_actualuser = true; 
          }
        }) 
        console.log(data)
      }
    }, err => { console.log('errorrrr', err) } ); 
  }
     

  
  /***
   * fotoId: id de firebase de la foto que hay que votar o quitar el voto
   * Tipo: si hay que quitar el like o agregarlo
   */
   votar(fotoId: string ) {
 
    let foto_actualizada:any;
    let usuarios_like2:any;
    this.contact.forEach((foto:any) => {
      if(foto.doc_id== fotoId){
            if(foto.like_actualuser){//quitar like
              foto.like_actualuser= false;
              //actualizar en firebase
              //llegar en esta fotoid al campo usuarios_likes y al acutual email borrarlo
               foto.usuarios_like.splice( foto.usuarios_like.indexOf(this.usuario_email),1)
              
              foto_actualizada={ 
                fullDate:foto.fullDate, 
                imagenes: foto.imagenes,
                tipo:foto.tipo,
                usuario: foto.usuario,
                usuarios_like: foto.usuarios_like, 
                cantidad_likes: foto.cantidad_likes -1 
              }
              this.imagenSrv.actualizarLike(fotoId, foto_actualizada)



            }else{//agregar el like 
              foto.like_actualuser=true;
              //actualizar en firebase   
              usuarios_like2= foto.usuarios_like.push(this.usuario_email);
              console.log('usuario email',this.usuario_email)
              console.log('array dsps de push ',foto.usuarios_like)
              foto_actualizada={ 
                fullDate:foto.fullDate, 
                imagenes: foto.imagenes,
                tipo:foto.tipo,
                usuario: foto.usuario,
                usuarios_like: foto.usuarios_like, 
                cantidad_likes: foto.cantidad_likes + 1 
              }
              
              console.log(foto_actualizada)
            this.imagenSrv.actualizarLike(fotoId, foto_actualizada)
              
            }
      }
    });
     
  }

  estaLikeada(fotoId: string):boolean {
    let retorno:boolean=false;
    this.contact.forEach((element: any) => {
      if (fotoId == element.doc_id) {
        if ( element.usuarios_like  != null) {
          element.usuarios_like.forEach((likes:any) => { 
            if (likes == this.usuario_email) {
              retorno= true;
            }
          });  
        }
      }  
    }); 
    return retorno;
  }
}
