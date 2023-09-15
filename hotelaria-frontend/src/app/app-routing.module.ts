import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChangePasswordFormComponent,
  CreateAccountFormComponent,
  LoginFormComponent,
  ResetPasswordFormComponent
} from './shared/components';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule, DxFileUploaderModule,
    DxFormModule, DxGalleryModule, DxListModule, DxNumberBoxModule, DxSelectBoxModule,
    DxSwitchModule, DxTabPanelModule,
    DxTextBoxModule
} from 'devextreme-angular';
import {BaseCrudComponent} from "./shared/components/base-crud/base-crud.component";
import {ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import {NgForOf, NgIf} from "@angular/common";
import { HotelComponent } from './pages/hotel/hotel.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { TipoComponent } from './pages/tipo/tipo.component';
import { QuartoComponent } from './pages/quarto/quarto.component';
import { HospedeComponent } from './pages/hospede/hospede.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: 'reservas',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservas/cad',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reservas/edit/:id',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresas',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresas/cad',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresas/edit/:id',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospedes',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospedes/cad',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospedes/edit/:id',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quartos',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quartos/cad',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quartos/edit/:id',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos/cad',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipos/edit/:id',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categorias/cad',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categorias/edit/:id',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hotel',
    component: HotelComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hotel/cad',
    component: HotelComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hotel/edit/:id',
    component: HotelComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, NgIf, DxTextBoxModule, DxCheckBoxModule, FormsModule, DxSwitchModule, DxNumberBoxModule, DxSelectBoxModule, DxTabPanelModule, DxListModule, DxFileUploaderModule, DxGalleryModule, NgForOf],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    BaseCrudComponent,
    ToolbarComponent,
    HotelComponent,
    CategoriaComponent,
    TipoComponent,
    QuartoComponent,
    HospedeComponent,
    EmpresaComponent,
    ReservaComponent
  ]
})
export class AppRoutingModule { }
