import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  clave: string;
  show_error: boolean = false; //
  descripcion_error: string = '';
  
  public loginForm: FormGroup;
  constructor(
    private authSrv: AuthService
    , private router: Router
, public toastController: ToastController 
,private spinner: NgxSpinnerService
, private fromBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      clave: ['', Validators.compose([Validators.required, Validators.maxLength(6)])]
  })
   }

  autocompletar(numero: number) {

    if (numero == 1) {
      this.clave = '123456';
      this.email = 'admin@admin.com';
    } else if (numero == 2) {
      this.clave = '123456';
      this.email = 'invitado@invitado.com';
    } else if(numero==3){
      this.clave = '123456';
      this.email = 'usuario@usuario.com';
    } else if(numero==4){
      this.clave = '123456';
      this.email = 'anonimo@anonimo.com';
    } else {
      this.clave = '123456';
      this.email = 'tester@tester.com';
    }
  }


  async ingresar() { 
     this.spinner.show();
    try {
      const user = await this.authSrv.loginUser(this.loginForm.get('email').value, this.loginForm.get('clave').value);
 
      if (user) {

        localStorage.setItem('usuario_relevamiento', JSON.stringify({ 'email': this.email, 'sesion': 'activa' }));
         
      
      }


    }catch(err) {
      err.code == "auth/wrong-password" ? this.presentToast("Uno o mas campos son invalidos...") : this.presentToast("Ha ocurrido un error vuelva a intentar.")
    }finally{
      setTimeout(() => {
        this.spinner.hide(); 
        this.router.navigate(['/home']);
      }, 3000);
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'toast-danger'
    });
    toast.present();
  }
}
