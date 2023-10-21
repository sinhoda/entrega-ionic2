import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar-clase',
  templateUrl: './registrar-clase.page.html',
  styleUrls: ['./registrar-clase.page.scss'],
})
export class RegistrarClasePage implements OnInit {
  handlerMessage = '';
  roleMessage = '';

  //Variables mensajes
  nomProfesor = "";
  salaClase = "";
  horaClase = "";
  diaClase = "";

  nomAlumno = "";
  apeAlumno = "";
  rutAlumno = "";
  latiAlumno: any;
  longAlumno: any;

  selfieImage: any;

  
  constructor(private storage:StorageService, private alertController: AlertController, private router: Router) { 
    
  }

  ngOnInit() {

    //Datos clase
    let valuesClase = JSON.parse(localStorage.getItem('claseStorage')!);
    console.log(valuesClase);
    this.nomProfesor = valuesClase.nombreProfesor;
    this.salaClase = valuesClase.sala;
    this.horaClase = valuesClase.hora;
    this.diaClase = valuesClase.dia;
    //
    let valueAlumno = JSON.parse(localStorage.getItem('usuario')!);
    console.log(valueAlumno);
    let valRut = valueAlumno.usuario;
    this.obtenerDatos(valRut)

    
    this.fetchLocation()
  }

  //Obtener los datos del usuario
  async obtenerDatos(rut: string){
    let alumno = JSON.parse((await (this.storage.read(rut))).value!);
    this.nomAlumno = alumno.nombre;
    this.apeAlumno = alumno.apellido;
    this.rutAlumno = alumno.rut;
  }

  //Obtener latitud y longitud
  async fetchLocation(){
    const location = await Geolocation.getCurrentPosition();
    console.log('latitud', location.coords.latitude);
    console.log('longitud', location.coords.longitude);
    this.latiAlumno = location.coords.latitude;
    this.longAlumno = location.coords.longitude;
  }  


  //Tomar foto
  async takePhoto(){
    Camera.requestPermissions();
    
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl  ,
        source: CameraSource.Camera,
        saveToGallery: true,
    });


    this.selfieImage = image.dataUrl
    
    };



  async registrarClase() {
    
    
    let messageAlert = "Felicidades "+ this.nomAlumno + " " + this.apeAlumno + " registrate tu clase correctamente";
      const alert = await this.alertController.create({
        header: 'Clase registrada con exito',
        message: messageAlert,
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
        ],
      });
  
      await alert.present();
    }

}
    


