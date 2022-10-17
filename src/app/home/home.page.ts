import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController,
    private authsrv: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quiere cerrar sesion?',
      cssClass: 'alertSesion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'

        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.spinner.show();
            setTimeout(() => {
              this.authsrv.LogOut();

              this.spinner.hide();
              this.router.navigateByUrl('login')
            }, 3000);

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

}
