import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ApiRegionService } from '../api/api-region.service';
import { ApiComunaService } from '../api/api-comuna.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {


  //Para ingresar en preferences
  nombreForm="";
  apellidoForm="";
  rutForm="";
  passwordForm = "";
  regionForm = "";
  comunaForm = "";




  //Para apis
  arrayRegion:any = null;
  arrayComuna:any = null;

  constructor(private storage: StorageService, public apiRegion:ApiRegionService, public apiComuna:ApiComunaService, private router: Router
    , private alertController: AlertController) { 

    }

  ngOnInit() {
    
    this.getPostsRegion();//Llamamos a la función getPost cuando la vista se cargue  
  }

  async registrar(){
     let usuario = {
      nombre: this.nombreForm,
      apellido: this.apellidoForm,
      rut: this.rutForm,
      password: this.passwordForm,
      region: this.regionForm,
      comuna: this.comunaForm,
    }

    let encontrado =  (await this.storage.read(this.rutForm)).value
    console.log(encontrado); 
    if(encontrado != null){
      console.log("Usuario ya registrado");
      this.presentAlert();
    }
    else{
       this.storage.create(this.rutForm,JSON.stringify(usuario)) 
       this.router.navigate(['/login']); 
    } 
  }

  
  getPostsRegion() { //llamamos a la funcion getPost de nuestro servicio.
    this.apiRegion.getPosts()
    .then(data => { 
      console.log(typeof(data));
      this.arrayRegion = data;
      console.log(this.arrayRegion.data);
    });
  }

  
  //Comuna
  handleChangeRegion(e: any){

    const index = this.arrayRegion.data.findIndex(
    (item: { id: string; })=> item.id == e.detail.value); 

    this.regionForm = this.arrayRegion.data[index].nombre
    console.log(this.regionForm);
    
    this.getPostsComuna(e.detail.value)
    
    
  }

  getPostsComuna(numComuna: string) { //llamamos a la funcion getPost de nuestro servicio.
    this.apiComuna.getPosts(numComuna)
    .then(data => { 
      console.log(typeof(data));
      this.arrayComuna = data;
      console.log(this.arrayComuna.data);
    }); 
  }

  handleChangeComuna(e: any){    
    //Seleccionador id de select
    const index = this.arrayComuna.data.findIndex(
      (item: { id: string; })=> item.id == e.detail.value); 
    
      this.comunaForm = this.arrayComuna.data[index].nombre
      console.log(this.comunaForm);
  }


  //Limpiar formulario
  limpiarForm(formulario: any){
    console.log(formulario);
    
    formulario.reset()
  }


  async presentAlert() {
    let customMessage = "El rut utilizado "+ this.rutForm  +" ya esta registrao"
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Rut registrado',
      message: customMessage,
      buttons: ['Cerrar venta'],
    });

    await alert.present();
  }
}
