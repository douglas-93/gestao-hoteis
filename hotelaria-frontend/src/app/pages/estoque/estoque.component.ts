import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {ProdutoModel} from "../../shared/models/produtoModel";
import {ProdutoService} from "../../shared/services/produto.service";
import {TiposProdutoEnum} from "../../shared/enums/TiposProdutoEnum";
import {Utils} from "../../shared/Utils";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

    @ViewChild('gridMovimento', {static: false}) gridMovimento: DxDataGridComponent;

    produtos: ProdutoModel[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
      this.produtoService.findAll().subscribe({
          next: resp => {
              if (resp.ok) {
                  this.produtos = resp.body!
              }
          }
      })
  }

    protected readonly ModeEnum = ModeEnum;
    protected readonly TiposProdutoEnum = TiposProdutoEnum;
    protected readonly Utils = Utils;
    produtosNaGrid: ProdutoModel[] = [];

    salvar() {
        console.log(this.gridMovimento.instance.getDataSource().items());
        console.log(this.produtosNaGrid)
    }
}
