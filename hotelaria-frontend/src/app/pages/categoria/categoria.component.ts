import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModeEnum} from "../../shared/enums/mode.enum";
import {CategoriaQuartoModel} from "../../shared/models/categoriaQuarto.model";
import notify from "devextreme/ui/notify";
import {CategoriaService} from "../../shared/services/categoria.service";
import {DxTextBoxComponent} from "devextreme-angular";



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  @ViewChild('categoriaTextBox') categoriaTextBox: DxTextBoxComponent;

  mode: ModeEnum = ModeEnum.LIST
  categorias: CategoriaQuartoModel[];
  categoria: CategoriaQuartoModel;
  protected readonly ModeEnum = ModeEnum;

  constructor(private router: Router,
              private categoriaService: CategoriaService) {
    this.categoria = new CategoriaQuartoModel();
  }

  ngOnInit(): void {
    this.mode = (this.router.url.includes('cad') ||
      this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;
  }

  buscar() {
    this.categoriaService.findAll().subscribe(res => {
      if (res.ok) {
        this.categorias = res.body!
      }
    })
  }

  novo() {
    this.router.navigate(['categoria', 'cad']);
  }

  salvar() {
    if (this.categoria.nome === undefined) {
      this.categoriaTextBox.isValid = false;
      notify('O nome da categoria é obrigatório', 'error', 3000);
      return;
    }

    this.categoriaService.save(this.categoria).subscribe(res => {
      if (res.ok) {
        this.categoria = res.body!
        notify('Salvo com sucesso', 'success', 3000);
      }
    })
  }
}
