import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {
    DevExtremeModule
  , DxAutocompleteModule
  , DxButtonModule
  , DxCalendarModule
  , DxCheckBoxModule
  , DxDataGridModule
  , DxDateBoxModule
  , DxFileUploaderModule
  , DxFormModule
  , DxGalleryModule
  , DxListModule
  , DxLoadIndicatorModule
  , DxNumberBoxModule
  , DxPopupModule
  , DxSchedulerModule
  , DxSelectBoxModule
  , DxSwitchModule
  , DxTabPanelModule
  , DxTextAreaModule
  , DxTextBoxModule
} from 'devextreme-angular';
import {BaseCrudComponent} from "./shared/components/base-crud/base-crud.component";
import {ToolbarComponent} from "./shared/components/toolbar/toolbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HotelComponent} from './pages/hotel/hotel.component';
import {CategoriaComponent} from './pages/categoria/categoria.component';
import {TipoComponent} from './pages/tipo/tipo.component';
import {QuartoComponent} from './pages/quarto/quarto.component';
import {HospedeComponent} from './pages/hospede/hospede.component';
import {EmpresaComponent} from './pages/empresa/empresa.component';
import {ReservaComponent} from './pages/reserva/reserva.component';
import {FormsModule} from "@angular/forms";
import {EnderecoFormComponent} from "./shared/components/endereco-form/endereco-form.component";
import {ConfiguracoesComponent} from './pages/configuracoes/configuracoes.component';
import {ConsumoComponent} from './pages/consumo/consumo.component';
import {MonitorReservasComponent} from './pages/monitor-reservas/monitor-reservas.component';
import {ProdutoComponent} from './pages/produto/produto.component';
import {EstoqueComponent} from './pages/estoque/estoque.component';
import {CalculadoraComponent} from "./shared/components/calculadora/calculadora.component";

const routes: Routes = [
    {
        path: 'estoque',
        component: EstoqueComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'estoque/cad',
        component: EstoqueComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'estoque/edit/:id',
        component: EstoqueComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'produto',
        component: ProdutoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'produto/cad',
        component: ProdutoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'produto/edit/:id',
        component: ProdutoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'monitor-reservas',
        component: MonitorReservasComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'configuracoes',
        component: ConfiguracoesComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'consumo',
        component: ConsumoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'consumo/cad/:id',
        component: ConsumoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'reservas',
        component: ReservaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'reservas/cad',
        component: ReservaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'reservas/edit/:id',
        component: ReservaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'empresas',
        component: EmpresaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'empresas/cad',
        component: EmpresaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'empresas/edit/:id',
        component: EmpresaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hospedes',
        component: HospedeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hospedes/cad',
        component: HospedeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hospedes/edit/:id',
        component: HospedeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'quartos',
        component: QuartoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'quartos/cad',
        component: QuartoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'quartos/edit/:id',
        component: QuartoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tipos',
        component: TipoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tipos/cad',
        component: TipoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tipos/edit/:id',
        component: TipoComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'categorias',
        component: CategoriaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'categorias/cad',
        component: CategoriaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'categorias/edit/:id',
        component: CategoriaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hotel',
        component: HotelComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hotel/cad',
        component: HotelComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'hotel/edit/:id',
        component: HotelComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxButtonModule, NgIf, DxTextBoxModule, DxCheckBoxModule, FormsModule, DxSwitchModule, DxNumberBoxModule, DxSelectBoxModule, DxTabPanelModule, DxListModule, DxFileUploaderModule, DxGalleryModule, NgForOf, DxDateBoxModule, DxTextAreaModule, DxPopupModule, DxAutocompleteModule, DxCalendarModule, DxLoadIndicatorModule, DxSchedulerModule, DevExtremeModule, DatePipe]
  ,
    providers: [AuthGuardService]
  ,
    exports: [RouterModule]
  ,
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
        ReservaComponent,
        EnderecoFormComponent,
        ConfiguracoesComponent,
        ConsumoComponent,
        MonitorReservasComponent,
        ProdutoComponent,
        EstoqueComponent,
        CalculadoraComponent
    ]
})
export class AppRoutingModule {
}
