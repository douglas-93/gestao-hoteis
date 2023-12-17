import {Component, ViewChild} from '@angular/core';
import {EnderecoModel} from "../../models/endereco.model";
import notify from "devextreme/ui/notify";
import {DxDataGridComponent, DxFormComponent, DxTextBoxComponent} from "devextreme-angular";
import {CepService} from "../../services/cep.service";


@Component({
    selector: 'app-endereco-form',
    templateUrl: './endereco-form.component.html',
    styleUrls: ['./endereco-form.component.scss']
})
export class EnderecoFormComponent {

    @ViewChild('enderecoForm', {static: false}) enderecoForm: DxFormComponent;
    @ViewChild('grid', {static: false}) grid: DxDataGridComponent;
    @ViewChild('numero') numeroTxtBox: DxTextBoxComponent;

    endereco: EnderecoModel;
    enderecoSelecinado: EnderecoModel;
    gridData: EnderecoModel[];

    constructor(private cepService: CepService) {
    }

    ngOnInit() {
        this.endereco = new EnderecoModel();
        this.gridData = [];
        this.addAddress = this.addAddress.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.editAddress = this.editAddress.bind(this);
    }

    buscaCep(e: any) {
        let cep = e.component.instance().option('value');
        if (cep) {
            this.cepService.buscaCep(cep).subscribe(res => {
                    if (res.ok && res.body?.erro !== true) {
                        this.endereco.rua = res.body?.logradouro!;
                        this.endereco.bairro = res.body?.bairro!;
                        this.endereco.cidade = res.body?.localidade!;
                        this.endereco.estado = res.body?.uf!;
                        this.endereco.pais = 'Brasil'

                        this.numeroTxtBox.instance.focus();

                        return;
                    }
                    if (res.body?.erro === true) {
                        this.clearEndereco();
                        notify('Não conseguimos identificar seu CEP', 'error', 3000);
                    }
                }
            );
        }
    }

    clearEndereco() {
        this.endereco = new EnderecoModel();
        /*this.endereco.cep = '';
        this.endereco.rua = '';
        this.endereco.bairro = '';
        this.endereco.numero = '';
        this.endereco.cidade = '';
        this.endereco.estado = '';*/
    }

    validateForm() {
        return this.getGridData().length != 0;
    }

    getGridData() {
        return this.gridData;
    }

    setGridData(enderecos: EnderecoModel[]) {
        this.gridData = enderecos;
    }

    onToolbarPreparing(e: any) {
        // Adicione botões personalizados à toolbar
        e.toolbarOptions.items.push(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-plus-circle',
                    onClick: this.addAddress,
                    onEnterKey: this.addAddress
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-minus-circle',
                    onClick: this.removeAddress,
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'fa fa-pencil',
                    onClick: this.editAddress,
                }
            }
        );
    }

    editAddress() {
        let indexOfAddress = this.gridData.indexOf(this.enderecoSelecinado);
        if (indexOfAddress != -1) {
            this.endereco = this.enderecoSelecinado
            this.gridData.splice(indexOfAddress, 1);
            this.enderecoSelecinado = new EnderecoModel();
            return;
        }
        notify('Selecione o endereço a ser editado', 'warning', 3000);
    }

    removeAddress() {
        let indexOfAddress = this.gridData.indexOf(this.enderecoSelecinado);
        if (indexOfAddress != -1) {
            this.gridData.splice(indexOfAddress, 1);
            this.enderecoSelecinado = new EnderecoModel();
        } else {
            notify('Selecione o endereço a ser removido', 'warning', 3000);
        }
    }

    addAddress() {
        if (this.enderecoForm.instance.validate().isValid) {
            this.gridData.push(this.getFormData());
            this.clearEndereco();
            return;
        }
        notify('Preencha todos os campos solicitados', 'error', 3000);
    }

    selectAddress(e: any) {
        e.component.byKey(e.currentSelectedRowKeys[0]).done(endereco => {
            if (endereco) {
                this.enderecoSelecinado = endereco;
            }
        });
    }

    private getFormData() {
        return this.enderecoForm.formData;
    }

}
