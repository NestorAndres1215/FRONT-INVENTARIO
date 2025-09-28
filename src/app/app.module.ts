import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

//importaciones de angular material
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
//importacion del component

import { LoginComponent } from './pages/configuracion/login/login.component';
import { HomeComponent } from './pages/configuracion/home/home.component';

import { DashboardComponent } from './pages/admin/home-admin/home-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarAdminComponent } from './shared/navbar-admin/navbar-admin.component';
import { PrincipalComponent } from './pages/admin/principal/principal.component';
import { PerfilComponent } from './pages/admin/perfil/perfil.component';
import { ProductosComponent } from './pages/admin/productos/productos.component';
import { UsuarioComponent } from './pages/admin/usuario/usuario.component';
import { ProveedorComponent } from './pages/admin/proveedor/proveedor.component';

import { ConfiguracionComponent } from './pages/admin/configuracion/configuracion.component';
import { CrearProductoComponent } from './pages/admin/productos/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './pages/admin/productos/actualizar-producto/actualizar-producto.component';

import { ListarActivadasProveedorComponent } from './pages/admin/proveedor/listar-activadas-proveedor/listar-activadas-proveedor.component';
import { ListarDesactivarProveedorComponent } from './pages/admin/proveedor/listar-desactivar-proveedor/listar-desactivar-proveedor.component';
import { CrearProveedorComponent } from './pages/admin/proveedor/crear-proveedor/crear-proveedor.component';
import { ActualizarProveedorComponent } from './pages/admin/proveedor/actualizar-proveedor/actualizar-proveedor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListarProductoActivadasComponent } from './pages/admin/productos/listar-producto-activadas/listar-producto-activadas.component';
import { ListarProductoDesactivadasComponent } from './pages/admin/productos/listar-producto-desactivadas/listar-producto-desactivadas.component';
import { NavbarUsuarioComponent } from './shared/navbar-usuario/navbar-usuario.component';
import { HomeUsuarioComponent } from './pages/usuario/home-usuario/home-usuario.component';
import { UsuarioAdministradorComponent } from './pages/admin/usuario/usuario-administrador/usuario-administrador.component';
import { UsuarioOperadorComponent } from './pages/admin/usuario/usuario-operador/usuario-operador.component';

import { InventarioUsuarioComponent } from './pages/usuario/inventario-usuario/inventario-usuario.component';
import { PrincipalUsuarioComponent } from './pages/usuario/principal-usuario/principal-usuario.component';
import { ConfiguracionUsuarioComponent } from './pages/usuario/configuracion-usuario/configuracion-usuario.component';
import { ListaUsuarioAdministradorActivadosComponent } from './pages/admin/usuario/usuario-administrador/lista-usuario-administrador-activados/lista-usuario-administrador-activados.component';
import { ListaUsuarioAdministradorDesactivadosComponent } from './pages/admin/usuario/usuario-administrador/lista-usuario-administrador-desactivados/lista-usuario-administrador-desactivados.component';
import { ListaUsuarioOperadorActivadosComponent } from './pages/admin/usuario/usuario-operador/lista-usuario-operador-activados/lista-usuario-operador-activados.component';
import { RegistrarUsuarioAdministradorComponent } from './pages/admin/usuario/usuario-administrador/registrar-usuario-administrador/registrar-usuario-administrador.component';
import { ListaUsuarioOperadorDesactivadosComponent } from './pages/admin/usuario/usuario-operador/lista-usuario-operador-desactivados/lista-usuario-operador-desactivados.component';
import { RegistrarUsuarioOperadorComponent } from './pages/admin/usuario/usuario-operador/registrar-usuario-operador/registrar-usuario-operador.component';
import { DetalleUsuarioComponent } from './pages/admin/usuario/detalle-usuario/detalle-usuario.component';
import { DetalleProveedorComponent } from './pages/admin/proveedor/detalle-proveedor/detalle-proveedor.component';
import { DetalleProductoComponent } from './pages/admin/productos/detalle-producto/detalle-producto.component';

import { ReclamosComponent } from './pages/admin/reclamos/reclamos.component';
import { ListarInventarioComponent } from './pages/usuario/inventario-usuario/listar-inventario/listar-inventario.component';

import { GoogleChartsModule } from 'angular-google-charts';
import {MatDialogModule} from '@angular/material/dialog';
import { EntradasComponent } from './pages/admin/entradas/entradas.component';
import { ListarEntradasComponent } from './pages/admin/entradas/listar-entradas/listar-entradas.component';
import { RegistrarEntradaComponent } from './pages/admin/entradas/registrar-entrada/registrar-entrada.component';
import { DetalleEntradaComponent } from './pages/admin/entradas/detalle-entrada/detalle-entrada.component';
import { SalidasComponent } from './pages/admin/salidas/salidas.component';
import { RegistrarSalidasComponent } from './pages/admin/salidas/registrar-salidas/registrar-salidas.component';
import { ListarSalidasComponent } from './pages/admin/salidas/listar-salidas/listar-salidas.component';
import { DetalleSalidasComponent } from './pages/admin/salidas/detalle-salidas/detalle-salidas.component';

import { SalidaUsuarioComponent } from './pages/usuario/salida-usuario/salida-usuario.component';
import { EntradaUsuarioComponent } from './pages/usuario/entrada-usuario/entrada-usuario.component';
import { ListarEntradasUsuarioComponent } from './pages/usuario/entrada-usuario/listar-entradas-usuario/listar-entradas-usuario.component';
import { ListarSalidaUsuarioComponent } from './pages/usuario/salida-usuario/listar-salida-usuario/listar-salida-usuario.component';
import { ActualizarUsuarioComponent } from './pages/admin/usuario/actualizar-usuario/actualizar-usuario.component';
import { NosotrosComponent } from './pages/empresa/nosotros/nosotros.component';
import { ListarReclamoActivadosComponent } from './pages/admin/reclamos/listar-reclamo-activados/listar-reclamo-activados.component';
import { ListarReclamoDesactivadosComponent } from './pages/admin/reclamos/listar-reclamo-desactivados/listar-reclamo-desactivados.component';
import { GuardarReclamoComponent } from './pages/admin/reclamos/guardar-reclamo/guardar-reclamo.component';
import { ResponderCorreoComponent } from './pages/admin/reclamos/responder-correo/responder-correo.component';
import { PerfilUsuarioComponent } from './pages/usuario/perfil-usuario/perfil-usuario.component';
import { ActualizarUsuarioUsuarioComponent } from './pages/usuario/actualizar-usuario-usuario/actualizar-usuario-usuario.component';
import { DetalleEntradaUsuarioComponent } from './pages/usuario/entrada-usuario/detalle-entrada-usuario/detalle-entrada-usuario.component';
import { ActualizarInventarioComponent } from './pages/usuario/inventario-usuario/actualizar-inventario/actualizar-inventario.component';
import { GuardarInventarioComponent } from './pages/usuario/inventario-usuario/guardar-inventario/guardar-inventario.component';
import { RegistarSalidaUsuarioComponent } from './pages/usuario/salida-usuario/registar-salida-usuario/registar-salida-usuario.component';
import { RegistrarEntradaUsuarioComponent } from './pages/usuario/entrada-usuario/registrar-entrada-usuario/registrar-entrada-usuario.component';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarAdminComponent,
    PrincipalComponent,
    PerfilComponent,
    ProductosComponent,
    UsuarioComponent,
    ProveedorComponent,

    ConfiguracionComponent,
    CrearProductoComponent,
    ActualizarProductoComponent,
    ListarActivadasProveedorComponent,
    ListarDesactivarProveedorComponent,
    CrearProveedorComponent,
    ActualizarProveedorComponent,
    ListarProductoActivadasComponent,
    ListarProductoDesactivadasComponent,
    NavbarUsuarioComponent,
    HomeUsuarioComponent,
    UsuarioAdministradorComponent,
    UsuarioOperadorComponent,

  
    InventarioUsuarioComponent,
    PrincipalUsuarioComponent,
    ConfiguracionUsuarioComponent,
    ListaUsuarioAdministradorActivadosComponent,
    ListaUsuarioAdministradorDesactivadosComponent,
    ListaUsuarioOperadorActivadosComponent,
    RegistrarUsuarioAdministradorComponent,
    ListaUsuarioOperadorDesactivadosComponent,
    RegistrarUsuarioOperadorComponent,
    DetalleUsuarioComponent,

    DetalleProveedorComponent,
    DetalleProductoComponent,


    ReclamosComponent,
    ListarInventarioComponent,

    EntradasComponent,
    ListarEntradasComponent,
    RegistrarEntradaComponent,
    DetalleEntradaComponent,
    SalidasComponent,
    RegistrarSalidasComponent,
    ListarSalidasComponent,
    DetalleSalidasComponent,
   
    SalidaUsuarioComponent,
    EntradaUsuarioComponent,
    ListarEntradasUsuarioComponent,
    ListarSalidaUsuarioComponent,
 
    ActualizarUsuarioComponent,
    NosotrosComponent,
    ListarReclamoActivadosComponent,
    ListarReclamoDesactivadosComponent,
    GuardarReclamoComponent,
    ResponderCorreoComponent,
    PerfilUsuarioComponent,
    ActualizarUsuarioUsuarioComponent,
    DetalleEntradaUsuarioComponent,
    ActualizarInventarioComponent,
    GuardarInventarioComponent,
    RegistarSalidaUsuarioComponent,
    RegistrarEntradaUsuarioComponent,




  ],
  imports: [
    GoogleChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatOptionModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatPaginatorModule,
    ReactiveFormsModule, 

  ],

  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }