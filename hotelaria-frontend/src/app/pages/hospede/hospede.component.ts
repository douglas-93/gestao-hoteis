import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {HospedeModel} from "../../shared/models/hospede.model";
import notify from "devextreme/ui/notify";
import {EnderecoFormComponent} from "../../shared/components/endereco-form/endereco-form.component";
import {DxFormComponent} from "devextreme-angular";
import {HospedeService} from "../../shared/services/hospede.service";
import {Utils} from "../../shared/Utils";

@Component({
    selector: 'app-hospede',
    templateUrl: './hospede.component.html',
    styleUrls: ['./hospede.component.scss']
})
export class HospedeComponent implements OnInit {

    @ViewChild('enderecoForm', {static: false}) enderecoForm: EnderecoFormComponent;
    @ViewChild('hospedeForm', {static: false}) hospedeForm: DxFormComponent;

    mode: ModeEnum = ModeEnum.LIST;
    hoje: Date = new Date(Date.now());
    hospede: HospedeModel;
    gridResult: HospedeModel[] = [];
    protected readonly Utils = Utils;
    hospedeSelecinado: HospedeModel;

    constructor(private router: Router,
                private hospedeServide: HospedeService) {
    }

    ngOnInit(): void {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') ||
            this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        this.hospede = new HospedeModel();

        if (edit) {
            this.findHospede(this.router.url.split('/').pop()!)
        }
    }

    buscar() {
        this.hospedeServide.findAll().subscribe(resp => {
            if (resp.ok) {
                this.gridResult = resp.body!;
            }
        })
    }

    novo() {
        this.router.navigate(['hospedes', 'cad'])
    }

    salvar() {
        this.hospedeForm.instance.validate();
        if (this.enderecoForm.validateForm() && this.hospedeForm.instance.validate().isValid) {
            this.hospede.endereco = this.enderecoForm.getGridData();

            this.hospedeServide.save(this.hospede).subscribe(resp => {
                if (resp.ok) {
                    notify('Salvo com sucesso', 'success', 3600);
                    window.history.back();
                }
            })
            return;
        }

        notify('Preencha os campos obrigatórios', 'error', 3600);
    }

    findHospede(id: string) {
        const idAsNumber = Number(id);
        this.hospedeServide.findById(idAsNumber).subscribe(resp => {
            if (resp.ok) {
                this.hospede = resp.body!;
                this.enderecoForm.setGridData(this.hospede.endereco);
            }
        })
    }

    selecionaHospede(e: any) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(hospede => {
            if (hospede) {
                this.hospedeSelecinado = hospede;
            }
        });
    }

    editar() {
        this.router.navigate(['hospedes', 'edit', this.hospedeSelecinado.id])
    }
}
