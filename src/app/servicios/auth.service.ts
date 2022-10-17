import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth
    ) {}


  public async loginUser(email:string, clave:string):Promise<any>{
    const resultado =  this.afAuth.signInWithEmailAndPassword(email, clave);
    return  resultado;
  }


  public async LogOut(){
    localStorage.removeItem('usuario_relevamiento');
    this.afAuth.signOut();
    //actualizar el firebase
  }


  public async registerUser(email:string, clave:string):Promise<any>{
    const resultado= await this.afAuth.createUserWithEmailAndPassword(email, clave);
    return resultado;
}
 

getCurrentUserFirebase(): Observable<any>{
 return this.afAuth.authState;
}


getCurrentUserLS(): any{
const userJson = localStorage.getItem('usuario_relevamiento');  
if(userJson != null  ){
return JSON.parse(userJson); 
}else{
  return null;
}
}

getCurrentUserLS_email(): any{
  
  let usuario= this.getCurrentUserLS();
  return usuario.email;
  }
}
