import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdutoModel} from "../../shared/models/ProdutoModel";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {DxSelectBoxComponent, DxTextBoxComponent} from "devextreme-angular";
import {ModeEnum} from "../../shared/enums/mode.enum";
import _ from "lodash";
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

    @ViewChild('tipos', {static: false}) tipos: DxSelectBoxComponent;

    produto: ProdutoModel;
    tiposProdutoEnumSelectBox;
    mode: ModeEnum;


    constructor() {
    }

    ngOnInit(): void {
        this.produto = new ProdutoModel();
        this.tiposProdutoEnumSelectBox = Object.keys(TiposProdutoEnum).map(key => ({
            value: key
          , displayText: TiposProdutoEnum[key].getDescricao()
        }));
    }

    validaCampos() {
        if (_.isEmpty(this.produto.nome) || _.isNil(this.produto.nome)) {
            notify('O nome do produto é obrigatório', 'error', 3600);
            return false;
        }

        if (_.isNil(this.produto.valor)) {
            notify('O valor do produto é obrigatório', 'error', 3600);
            return false;
        }

        if (_.isEmpty(this.produto.tipo) || _.isNil(this.produto.tipo)) {
            notify('O tipo do produto é obrigatório', 'error', 3600);
            return false;
        }
        return true;
    }

    protected readonly ModeEnum = ModeEnum;

    salvar() {
        if (this.validaCampos()) {
            console.log(this.produto)
            notify('Vamo salvar', 'success', 3600);
        }
    }

    defineValor(e) {
        this.produto.valor = e.value;
    }

    defineTipo(e) {
        this.produto.tipo = e.value
    }
}
