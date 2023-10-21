import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: StorageService, private router:Router) { }

  ngOnInit() {
    let values = {
      usuario: null, 
      permitido: false
    }
    localStorage.setItem("usuario", JSON.stringify(values));
    let value = JSON.parse(localStorage.getItem('usuario')!)
    console.log("valor permitido: ", value.permitido);
  }

  rutForm = "";
  passwordForm = "";

  async iniciarSesion(){
    let encontrado =  JSON.parse((await this.storage.read(this.rutForm)).value!);
    if(encontrado != null){
      console.log("Usuario encontrado");
      if (this.passwordForm == encontrado.password){
        console.log("contrasenia correcta");
        let values = {
          usuario: this.rutForm, 
          permitido: true
        }
        localStorage.setItem('usuario', JSON.stringify(values));
        this.router.navigate(['/scanner-qr']); 
      } else{
        console.log("contrasenia incorrecta");
        
      }
    }else{
      console.log("Usuario no encontrado");
    }
    
  }

}
