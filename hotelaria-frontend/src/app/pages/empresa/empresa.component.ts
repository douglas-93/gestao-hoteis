import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {EnderecoFormComponent} from "../../shared/components/endereco-form/endereco-form.component";
import {DxFormComponent} from "devextreme-angular";
import {EmpresaModel} from "../../shared/models/empresa.model";
import {EmpresaService} from "../../shared/services/empresa.service";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";

@Component({
    selector: 'app-empresa', templateUrl: './empresa.component.html', styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

    @ViewChild('enderecoForm', {static: false}) enderecoForm: EnderecoFormComponent;
    @ViewChild('empresaForm', {static: false}) empresaForma: DxFormComponent;

    mode: ModeEnum = ModeEnum.LIST;
    empresa: EmpresaModel;
    gridResult: EmpresaModel[] = [];
    empresaSelecinado: EmpresaModel;
    protected readonly Utils = Utils;

    constructor(private router: Router,
                private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') || this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        this.empresa = new EmpresaModel();

        if (edit) {
            this.findEmpresa(this.router.url.split('/').pop()!)
        }
    }

    buscar() {
        this.empresaService.findAll().subscribe(resp => {
            if (resp.ok) {
                this.gridResult = resp.body!
            }
        })
    }

    novo() {
        this.router.navigate(['empresas', 'cad'])
    }

    salvar() {
        this.empresa.endereco = this.enderecoForm.getGridData()
        this.empresaService.save(this.empresa).subscribe(resp => {
            if (resp.ok) {
                notify('Salvo com sucesso', 'success', 3600);
                window.history.back();
            }
        })
    }

    findEmpresa(id: string) {
        const idAsNumber = Number(id)
        this.empresaService.findById(idAsNumber).subscribe(resp => {
            if (resp.ok) {
                this.empresa = resp.body!
                this.enderecoForm.setGridData(this.empresa.endereco);
            }
        })
    }

    selecionaEmpresa(e: any) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(empresa => {
            if (empresa) {
                this.empresaSelecinado = empresa;
            }
        });
    }

    editar() {
        this.router.navigate(['empresas', 'edit', this.empresaSelecinado.id])
    }
}
