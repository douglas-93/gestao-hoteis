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
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';
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

const routes: Routes = [
  {
    path: 'pages/reserva',
    component: ReservaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/empresa',
    component: EmpresaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/hospede',
    component: HospedeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/quarto',
    component: QuartoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/tipo',
    component: TipoComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/categoria',
    component: CategoriaComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/hotel',
    component: HotelComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, NgIf],
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
