import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModeEnum} from "../../shared/enums/mode.enum";
import {CategoriaQuartoModel} from "../../shared/models/categoriaQuarto.model";
import notify from "devextreme/ui/notify";
import {CategoriaService} from "../../shared/services/categoria.service";
import {DxTextBoxComponent} from "devextreme-angular";
import {BaseCrudComponent} from "../../shared/components/base-crud/base-crud.component";
import _ from "lodash";


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  @ViewChild('categoriaTextBox') categoriaTextBox: DxTextBoxComponent;
  @ViewChild('crud') crud: BaseCrudComponent;

  mode: ModeEnum = ModeEnum.LIST
  categorias: CategoriaQuartoModel[];
  categoria: CategoriaQuartoModel;
  categoriaSelecinada: CategoriaQuartoModel;
  protected readonly ModeEnum = ModeEnum;

  constructor(private router: Router,
              private categoriaService: CategoriaService) {
    this.categoria = new CategoriaQuartoModel();
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
    this.categoriaService.findAll().subscribe(res => {
      if (res.ok) {
        this.categorias = res.body!
      }
    })
  }

  novo() {
    this.router.navigate(['categorias', 'cad']);
  }

  salvar() {
    if (_.isEmpty(this.categoria.nome)) {
      this.categoriaTextBox.isValid = false;
      notify('O nome da categoria é obrigatório', 'error', 3000);
      return;
    }

    this.categoriaService.save(this.categoria).subscribe(
      res => {
        if (res.ok) {
          this.categoria = res.body!
          notify('Salvo com sucesso', 'success', 3000);
          this.crud.toolbarEdit.voltar();
        }
      },
      error => {
        notify('Não foi possível salvar, verifique sua conexão com a internet e com o banco de dados',
          'error', 3000);
      })
  }

  selecionaCategoria(e) {
    e.component.byKey(e.currentSelectedRowKeys[0]).done(categoria => {
        if (categoria) {
          this.categoriaSelecinada = categoria;
        }
      }
    );
  }

  edit() {
    if (this.categoriaSelecinada) {
      this.router.navigate(['categorias', 'edit', this.categoriaSelecinada.id])
    }
  }

  findCategoria(id: string) {
    if (id) {
      this.categoriaService.findById(parseInt(id)).subscribe(
        res => {
          if (res.ok) {
            this.categoria = res.body!
          }
        },
        error => {
          notify('Não foi possível encontrar a categoria', 'error', 3000)
        }
      )
    }
  }
}
