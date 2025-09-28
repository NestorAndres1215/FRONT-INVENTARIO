import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from '../models/helper';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  //listar proveedor activadas
  public listarProveedorActivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/proveedor/activadas`);
  }

  // listar proveedor desactivadas
  public listarProveedorDesactivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/proveedor/desactivadas`);
  }



//crear proveedor
  public agregarProveedor(nombre: string, Ruc: string, Direccion: string, Telefono: string, Email: string): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('Ruc', Ruc);
    formData.append('Direccion', Direccion);
    formData.append('Telefono', Telefono);
    formData.append('Email', Email);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(baserUrl + '/proveedor/', formData, { headers: headers });
  }
  //actualizar proveedor
  public actualizarProveedor(proveedorId: number, proveedor: any): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', proveedor.nombre);
    formData.append('ruc', proveedor.ruc);
    formData.append('direccion', proveedor.direccion);
    formData.append('telefono', proveedor.telefono);
    formData.append('email', proveedor.email);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    return this.http.put(`${baserUrl}/proveedor/${proveedorId}`, formData, { headers });
  }


   //listar por id
   public obtenerProveedorPorId(proveedorId: any): Observable<any> {
    return this.http.get(`${baserUrl}/proveedor/${proveedorId}`);
  }


    //desactivar proveedor
    public desactivarProveedor(proveedorId: any): Observable<any> {
      return this.http.post(`${baserUrl}/proveedor/desactivar/${proveedorId}`, {});
    }
    //activar proveedor
    public activarProveedor(proveedorId: any) {
      return this.http.post(`${baserUrl}/proveedor/activar/${proveedorId}`, {})
    }
}


