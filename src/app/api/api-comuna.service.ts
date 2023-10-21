import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiComunaService {

  url = "https://dev.matiivilla.cl/duoc/location/comuna/";

  constructor(public http:HttpClient) { }

  getPosts(numRegion: string){
    let urlGet = this.url + numRegion;
    console.log(urlGet);
    
    return new Promise(resolve=>{
      this.http.get(urlGet).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    }); 
  }
}
