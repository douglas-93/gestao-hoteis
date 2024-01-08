import {Component, OnInit, ViewChild} from '@angular/core';
import {ProdutoModel} from "../../shared/models/ProdutoModel";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {DxSelectBoxComponent} from "devextreme-angular";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

    @ViewChild('tipos', {static: false}) tipos: DxSelectBoxComponent;

    produto: ProdutoModel;
    tiposProdutoEnumSelectBox;


  constructor() { }

  ngOnInit(): void {
      this.produto = new ProdutoModel();
      this.tiposProdutoEnumSelectBox = Object.keys(TiposProdutoEnum).map(key => ({ value: key, displayText: TiposProdutoEnum[key].getDescricao() }));
  }

}
