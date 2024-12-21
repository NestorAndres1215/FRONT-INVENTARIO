import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from 'src/app/services/helper';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) { }

  //listar usuario admin
  public obtenerAdminUsuarioRoles(): Observable<any> {
    return this.http.get(`${baserUrl}/usuariorol/admin/activadas`);
  }
  //listar usuario normal
  public obtenerNormalUsuarioRoles(): Observable<any> {
    return this.http.get(`${baserUrl}/usuariorol/normal/activadas`);
  }
  //listar usuario admin desactivados
  public obtenerAdminUsuarioRolesDesactivados(): Observable<any> {
    return this.http.get(`${baserUrl}/usuariorol/admin/desactivadas`);
  }
  //listar usuario normal desactivados
  public obtenerNormalUsuarioRolesDesactivados(): Observable<any> {
    return this.http.get(`${baserUrl}/usuariorol/normal/desactivadas`);
  }

  //registrar usuarios admin
  public añadirUsuarioAdmin(user: any) {
    return this.http.post(`${baserUrl}/usuarios/admin/`, user);
  }

  public desactivarUsuario1(usuarioRolId: any): Observable<any> {
    return this.http.post(`${baserUrl}/usuariorol/desactivar/${usuarioRolId}`, {});
  }
  desactivarUsuario(usuarioRolId: any): Observable<string> {
    const url = `${baserUrl}/usuariorol/desactivar/${usuarioRolId}`;
    return this.http.delete(url, { responseType: 'text' });
  }
  activarUsuario(usuarioRolId: any): Observable<string> {
    const url = `${baserUrl}/usuariorol/activar/${usuarioRolId}`;
    return this.http.delete(url, { responseType: 'text' });
  }


  public obtenerUsuarioPorId(usuarioRolId: any): Observable<any> {
    return this.http.get(`${baserUrl}/usuariorol/${usuarioRolId}`);
  }
  actualizarUsuario(id: number, usuarioActualizado: any): Observable<any> {
    const url = `${baserUrl}/usuariorol/${id}`;
    return this.http.put<any>(url, usuarioActualizado);
  }

}
