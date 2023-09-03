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
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxTextBoxModule} from 'devextreme-angular';
import {BaseCrudComponent} from "./shared/components/base-crud/base-crud.component";
import {ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import {NgIf} from "@angular/common";
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
    path: 'reserva',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reserva/cad',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reserva/edit',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresa/cad',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'empresa/edit',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospede',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospede/cad',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'hospede/edit',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quarto',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quarto/cad',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'quarto/edit',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipo',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipo/cad',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tipo/edit',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categoria/cad',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categoria/edit',
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
    path: 'hotel/edit',
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
    imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, NgIf, DxTextBoxModule, DxCheckBoxModule, FormsModule],
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
