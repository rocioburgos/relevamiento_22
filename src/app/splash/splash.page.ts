import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { Plugins } from '@capacitor/core';

 import { SplashScreen } from '@capacitor/splash-screen';
 
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 3000);
  }
  ngOnInit() {
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
SplashScreen.hide();
console.log("splash hide!")
  }

}
