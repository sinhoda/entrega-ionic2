import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})



export class ScannerQRPage implements OnInit {

  
    constructor(private alertController: AlertController, private router: Router, private route: ActivatedRoute) {
      
     }
  
    ngOnInit() {
    }
  
    handlerMessage = '';


    clase = {
      nombreProfesor: "",
      sala: "",
      hora: "",
      dia: ""
    };
  
    //Codigo de scaneo
    async startScan(){
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content);
        //this.presentAlert(result);
        
        this.sliceText(result);
      }
    };
    
    //Inicar escaneo
    askUser(){
  
      this.alertCodigoQr();
    };
  
    //Alerta
    async presentAlert() {
      let profesorMsg = `Profesor: ${this.clase.nombreProfesor}`
      let salaMsg = `Sala: ${this.clase.sala}`
      let bodyMsg = `Profesor:  ${this.clase.nombreProfesor} - Sala: ${this.clase.sala} - Dia: ${this.clase.dia} - Hora: ${this.clase.hora}`
      const alert = await this.alertController.create({
        header: profesorMsg,
        subHeader: salaMsg,
        message: bodyMsg,
        buttons: this.alertButtons,
        
        });
  
      
  
      await alert.present();
    }
  
  
    //Separar texto
    sliceText(result: any){
      let datos = JSON.stringify(result);
      console.log(typeof(datos));
      console.log("datos", datos);
      
      let vNombre = datos.slice(47,58);
      let vHora = datos.slice(66,71);
      let vSala = datos.slice(79,82);
      let vDia = datos.slice(89, 94);
      
      console.log(vNombre);
      console.log(vSala);
      console.log(vHora);
      console.log(vDia);
  
      this.clase = {
        nombreProfesor: vNombre,
        sala: vSala,
        hora: vHora,
        dia: vDia
      }
      
      this.presentAlert()
    }
    
    
    //Botones
    public alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Confirmar clase',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
          this.navigate()
        },
      },
    ];
  
    
    navigate(){
      localStorage.setItem("claseStorage", JSON.stringify(this.clase));
      this.router.navigate(['/registrar-clase'])
    }
  
    
  
    //Alerta leer codigo qr
    async alertCodigoQr() {
      const alert = await this.alertController.create({
        header: "¿Quieres iniciar ha escanear el codigo QR?",
        buttons: this.buttonsQr,
        
        });
  
      
  
      await alert.present();
    }
  
    //Botones codigo qr
    public buttonsQr = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'Iniciar escaneo',
        role: 'confirm',
        handler: () => {
          this.startScan()
          
        },
      },
    ];


    //Cancelar scanner
    async cancelarEscaneo() {
  
        const alert = await this.alertController.create({
          header: 'Cancelar escaneo de codigo qr',
          message: "¿Deseas volver al inicio?",
          buttons:[
            {
              text: 'Volver al inicio',
              role: 'volver',
              handler: () => {
                let values = {
                  usuario: null, 
                  permitido: false
                }
                this.handlerMessage = 'Alert canceled';
                localStorage.setItem("usuario", JSON.stringify(values));
                this.router.navigate(['/login']);
                
              },
            },
            {
              text: "Cerrar pestaña",
              role: "close"


            },

          ],
        });
    
        await alert.present();
      }
  
}
