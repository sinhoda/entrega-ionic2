import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.page.html',
  styleUrls: ['./recuperar-cuenta.page.scss'],
})
export class RecuperarCuentaPage implements OnInit {


  constructor(private storage:StorageService, private router: Router, private alertController: AlertController, ) { }

  ngOnInit() {
  }

  handlerMessage = '';
  roleMessage = '';

  rutForm = "";
  passwordFormFirst = "";
  passwordFormSecond = "";

  //
  reset(formulario: any){
    formulario.reset()
  }

  async cambiarPassword(){
    let encontrado =  JSON.parse((await this.storage.read(this.rutForm)).value!);
    
    
    if(encontrado != null){  
      console.log("usuario encontrado");
      if(this.passwordFormFirst == this.passwordFormSecond){

        console.log("Se cambio la contrasenia");
        encontrado.password = this.passwordFormFirst;
        this.storage.update(this.rutForm, JSON.stringify( encontrado));
        this.alertCambioPassword();


      }else{
        console.log("Contrasenias no coiciden");
        this.passwordsNoCoinciden();
      }
      
      
    }else{
      console.log("Usuario no encontrado");
      this.alertUsuarioNoEncontrado()
    }
    
  }

  //Alertas
  //Alerta cambio contra correcto
  async alertCambioPassword() {
    let messageAlert = "Se ha cambiado la contraseña correctamente.";
      const alert = await this.alertController.create({
        header: 'Contraseña cambiada correctamente',
        message: messageAlert,
        buttons:[
          {
            text: 'Volver al inicio',
            role: 'volver',
            handler: () => {
              this.handlerMessage = 'Alert canceled';
              this.router.navigate(['/login']);
            },
          },
        ],
      });
  
      await alert.present();
    }

    async alertUsuarioNoEncontrado() {
      let messageAlert = "El usuario de rut: " + this.rutForm + " no ha sido encontrado";
        const alert = await this.alertController.create({
          header: 'Usuario no encontrado',
          message: messageAlert,
          buttons:[
            {
              text: 'Volver al inicio',
              role: 'volver',
              handler: () => {
                this.handlerMessage = 'Alert canceled';
              },
            },
            {
              text: 'Cerrar mensaje',
              role: 'close',
            },
          ],
        });
    
        await alert.present();
      }

      

      //alerta password !=
      async passwordsNoCoinciden() {
        let messageAlert = "Las contraseñas ingresadas no coiciden entre si";
          const alert = await this.alertController.create({
            header: 'Contraseñas no coinciden',
            message: messageAlert,
            buttons:[
              {
                text: 'Volver al inicio',
                role: 'volver',
                handler: () => {
                  this.handlerMessage = 'Alert canceled';
                },
              },
              {
                text: 'Cerrar mensaje',
                role: 'close',
              },
            ],
          });
      
          await alert.present();
        }
    
}

