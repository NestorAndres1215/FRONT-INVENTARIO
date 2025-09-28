import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../models/helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

   añadirUsuario(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    }

}
