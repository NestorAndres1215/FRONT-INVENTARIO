import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import baserUrl from 'src/app/core/models/helper';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {



  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/producto';



  //actualizar proveedor
  public actualizarProducto(productoId: number, producto: any): Observable<any> {
    // Verificar si producto.proveedor.proveedorId es válido
    if (!producto.proveedor || !producto.proveedor.proveedorId) {
      console.error('ProveedorId es inválido.');
      return throwError('ProveedorId es inválido.');
    }
  
    // Crear FormData y agregar campos
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio.toString());
    formData.append('stock', producto.stock.toString());
    formData.append('ubicacion', producto.ubicacion);
    formData.append('proveedorId', producto.proveedor.proveedorId.toString());
  
    // Establecer encabezados
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    // Enviar solicitud PUT
    return this.http.put(`${baserUrl}/producto/${productoId}`, formData, { headers });
  }
  
  ///agregar producto
  public agregarProducto(
    nombre: string,
    precio: string,
    descripcion: string,
    stock: string,
    ubicacion: string,
    proveedor: number,
  ): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('stock', stock);
    formData.append('ubicacion', ubicacion);
    formData.append('proveedorId', proveedor.toString());
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(this.baseUrl + '/', formData, { headers: headers });
  }


  public listarProductoActivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/producto/activadas`);
  }


  public listarProductoDesactivadas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/producto/desactivadas`);
  }

  public obtenerProductoPorId(productoId: any): Observable<any> {
    return this.http.get(`${baserUrl}/producto/${productoId}`);
  }


  //desactivar proveedor
  public desactivarProducto(productoId: any): Observable<any> {
    return this.http.post(`${baserUrl}/producto/desactivar/${productoId}`, {});
  }
  //activar proveedor
  public activarProducto(productoId: any) {
    return this.http.post(`${baserUrl}/producto/activar/${productoId}`, {})
  }


}
