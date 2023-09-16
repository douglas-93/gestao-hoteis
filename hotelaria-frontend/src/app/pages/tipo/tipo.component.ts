import {Component, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from "devextreme-angular";
import {Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import {ModeEnum} from 'src/app/shared/enums/mode.enum';
import {TipoQuartoModel} from "../../shared/models/tipoQuarto.model";
import {TipoService} from "../../shared/services/tipo.service";
import {BaseCrudComponent} from "../../shared/components/base-crud/base-crud.component";
import _ from "lodash";

@Component({
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

    @ViewChild('tipoTextBox') tipoTextBox: DxTextBoxComponent;
    @ViewChild('crud') crud: BaseCrudComponent;

    mode: ModeEnum = ModeEnum.LIST
    tipos: TipoQuartoModel[];
    tipo: TipoQuartoModel;
    tipoSelecionado: TipoQuartoModel;
    protected readonly ModeEnum = ModeEnum;

    constructor(private router: Router,
                private tipoService: TipoService) {
        this.tipo = new TipoQuartoModel();
    }

    ngOnInit(): void {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;
        if (edit) {
            this.findCategoria(this.router.url.split('/').pop()!)
        }
    }

    buscar() {
        this.tipoService.findAll().subscribe(res => {
            if (res.ok) {
                this.tipos = res.body!
            }
        })
    }

    novo() {
        this.router.navigate(['tipos', 'cad']);
    }

    salvar() {
        if (_.isEmpty(this.tipo.nome)) {
            this.tipoTextBox.isValid = false;
            notify('O nome do tipo é obrigatório', 'error', 3000);
            return;
        }

        this.tipoService.save(this.tipo).subscribe(
            res => {
                if (res.ok) {
                    this.tipo = res.body!
                    notify('Salvo com sucesso', 'success', 3000);
                    this.crud.toolbarEdit.voltar();
                }
            },
            error => {
                notify('Não foi possível salvar, verifique sua conexão com a internet e com o banco de dados',
                    'error', 3000);
            })
    }

    selecionTipo(e) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(tipo => {
                if (tipo) {
                    this.tipoSelecionado = tipo;
                }
            }
        );
    }

    edit() {
        if (this.tipoSelecionado) {
            this.router.navigate(['tipos', 'edit', this.tipoSelecionado.id])
        }
    }

    findCategoria(id: string) {
        if (id) {
            this.tipoService.findById(parseInt(id)).subscribe(
                res => {
                    if (res.ok) {
                        this.tipo = res.body!
                    }
                },
                error => {
                    notify('Não foi possível encontrar a categoria', 'error', 3000)
                }
            )
        }
    }
}
