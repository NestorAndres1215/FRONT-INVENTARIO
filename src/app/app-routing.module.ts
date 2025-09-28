
import { DashboardComponent } from './pages/admin/home-admin/home-admin.component';
import { LoginComponent } from './pages/configuracion/login/login.component';
import { HomeComponent } from './pages/configuracion/home/home.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/admin/principal/principal.component';
import { PerfilComponent } from './pages/admin/perfil/perfil.component';


import { ProveedorComponent } from './pages/admin/proveedor/proveedor.component';
import { ProductosComponent } from './pages/admin/productos/productos.component';
import { UsuarioComponent } from './pages/admin/usuario/usuario.component';
import { ConfiguracionComponent } from './pages/admin/configuracion/configuracion.component';


import { CrearProductoComponent } from './pages/admin/productos/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './pages/admin/productos/actualizar-producto/actualizar-producto.component';

import { CrearProveedorComponent } from './pages/admin/proveedor/crear-proveedor/crear-proveedor.component';
import { ActualizarProveedorComponent } from './pages/admin/proveedor/actualizar-proveedor/actualizar-proveedor.component';
import { HomeUsuarioComponent } from './pages/usuario/home-usuario/home-usuario.component';
import { RegistrarUsuarioAdministradorComponent } from './pages/admin/usuario/usuario-administrador/registrar-usuario-administrador/registrar-usuario-administrador.component';
import { RegistrarUsuarioOperadorComponent } from './pages/admin/usuario/usuario-operador/registrar-usuario-operador/registrar-usuario-operador.component';
import { DetalleUsuarioComponent } from './pages/admin/usuario/detalle-usuario/detalle-usuario.component';
import { DetalleProveedorComponent } from './pages/admin/proveedor/detalle-proveedor/detalle-proveedor.component';
import { DetalleProductoComponent } from './pages/admin/productos/detalle-producto/detalle-producto.component';

import { PrincipalUsuarioComponent } from './pages/usuario/principal-usuario/principal-usuario.component';
import { InventarioUsuarioComponent } from './pages/usuario/inventario-usuario/inventario-usuario.component';

import { ConfiguracionUsuarioComponent } from './pages/usuario/configuracion-usuario/configuracion-usuario.component';

import { EntradasComponent } from './pages/admin/entradas/entradas.component';
import { RegistrarEntradaComponent } from './pages/admin/entradas/registrar-entrada/registrar-entrada.component';
import { DetalleEntradaComponent } from './pages/admin/entradas/detalle-entrada/detalle-entrada.component';
import { SalidasComponent } from './pages/admin/salidas/salidas.component';
import { RegistrarSalidasComponent } from './pages/admin/salidas/registrar-salidas/registrar-salidas.component';
import { DetalleSalidasComponent } from './pages/admin/salidas/detalle-salidas/detalle-salidas.component';

import { EntradaUsuarioComponent } from './pages/usuario/entrada-usuario/entrada-usuario.component';
import { SalidaUsuarioComponent } from './pages/usuario/salida-usuario/salida-usuario.component';
import { ActualizarUsuarioComponent } from './pages/admin/usuario/actualizar-usuario/actualizar-usuario.component';
import { ResponderCorreoComponent } from './pages/admin/reclamos/responder-correo/responder-correo.component';
import { ActualizarUsuarioUsuarioComponent } from './pages/usuario/actualizar-usuario-usuario/actualizar-usuario-usuario.component';
import { DetalleEntradaUsuarioComponent } from './pages/usuario/entrada-usuario/detalle-entrada-usuario/detalle-entrada-usuario.component';
import { ActualizarInventarioComponent } from './pages/usuario/inventario-usuario/actualizar-inventario/actualizar-inventario.component';
import { GuardarInventarioComponent } from './pages/usuario/inventario-usuario/guardar-inventario/guardar-inventario.component';
import { RegistarSalidaUsuarioComponent } from './pages/usuario/salida-usuario/registar-salida-usuario/registar-salida-usuario.component';
import { RegistrarEntradaUsuarioComponent } from './pages/usuario/entrada-usuario/registrar-entrada-usuario/registrar-entrada-usuario.component';
import { AdminGuard } from './core/guards/admin.guard';
import { NormalGuard } from './core/guards/normal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',


  },
  {
    path: 'admin',
    component: DashboardComponent,

    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: PrincipalComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },

      {
        path: 'salidas',
        component: SalidasComponent,
      },
      {
        path: 'salidas/registrar-salidas',
        component: RegistrarSalidasComponent,
      },
      {
        path: 'salidas/detalle/:detalleSalidaId',
        component: DetalleSalidasComponent,
      },

      {
        path: 'entradas',
        component: EntradasComponent,
      },
      {
        path: 'entradas/registrar-entradas',
        component: RegistrarEntradaComponent,
      },
      {
        path: 'entradas/detalle/:detalleEntradaId',
        component: DetalleEntradaComponent,
      },

      {
        path: 'proveedor',
        component: ProveedorComponent,
      },
      {
        path: 'proveedor/crear-proveedor',
        component: CrearProveedorComponent,
      },
      {
        path: 'proveedor/:proveedorId',
        component: ActualizarProveedorComponent,
      },
      {
        path: 'proveedor/detalle/:proveedorId',
        component: DetalleProveedorComponent,
      },

      {
        path: 'producto',
        component: ProductosComponent,
      },
      {
        path: 'producto/crear-producto',
        component: CrearProductoComponent,
      },
      {
        path: 'producto/:productoId',
        component: ActualizarProductoComponent,
      },
      {
        path: 'producto/detalle/:productoId',
        component: DetalleProductoComponent,
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
      {
        path: 'usuario/registrar-usuario-administrador',
        component: RegistrarUsuarioAdministradorComponent,
      },
      {
        path: 'usuario/registrar-usuario-operador',
        component: RegistrarUsuarioOperadorComponent,
      },
      {
        path: 'usuario/:usuarioRolId',
        component: DetalleUsuarioComponent,
      },

   
      {
        path: 'configuracion',
        component: ConfiguracionComponent
      },   {
        path: 'configuracion/reclamos/:reclamoId',
        component: ResponderCorreoComponent,
      },
      {
        path: 'configuracion/actualizar-usuario/:id',
        component: ActualizarUsuarioComponent
      }



    ]


  }, {
    path: 'user-dashboard',
    component: HomeUsuarioComponent,

    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: PrincipalUsuarioComponent,


      },
      {
        path: 'salidas/detalle/:detalleSalidaId',
        component: DetalleSalidasComponent,
      },
      {
        path: 'inventario',
        component: InventarioUsuarioComponent,
      },
      {
        path: 'inventario/crear-producto',
        component: GuardarInventarioComponent,
      },
      {
        path: 'inventario/:productoId',
        component: ActualizarInventarioComponent,
      },
      {
        path: 'entradas-usuario',
        component: EntradaUsuarioComponent,
      }, 
      {
        path: 'entradas-usuario/registrar-entradas',
        component: RegistrarEntradaUsuarioComponent,
      },
      {
        path: 'salidas-usuario',
        component: SalidaUsuarioComponent,
      },
      {
        path: 'salidas-usuario/registrar-salidas',
        component: RegistarSalidaUsuarioComponent,
      },
   

      {
        path: 'configuracion',
        component: ConfiguracionUsuarioComponent
      },

      {
        path: 'entradas/detalle/:detalleEntradaId',
        component: DetalleEntradaUsuarioComponent,
      },
      {
        path: 'configuracion/actualizar-usuario/:id',
        component: ActualizarUsuarioUsuarioComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
