import {Component, OnInit, ViewChild} from '@angular/core';
import {DxTextBoxComponent} from "devextreme-angular";
import {Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import {ModeEnum} from 'src/app/shared/enums/mode.enum';
import {TipoQuartoModel} from "../../shared/models/tipoQuarto.model";
import {TipoService} from "../../shared/services/tipo.service";

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  @ViewChild('tipoTextBox') tipoTextBox: DxTextBoxComponent;

  mode: ModeEnum = ModeEnum.LIST
  tipos: TipoQuartoModel[];
  tipo: TipoQuartoModel;
  protected readonly ModeEnum = ModeEnum;

  constructor(private router: Router,
              private tipoService: TipoService) {
    this.tipo = new TipoQuartoModel();
  }

  ngOnInit(): void {
    this.mode = (this.router.url.includes('cad') ||
      this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;
  }

  buscar() {
    this.tipoService.findAll().subscribe(res => {
      if (res.ok) {
        this.tipos = res.body!
      }
    })
  }

  novo() {
    this.router.navigate(['tipo', 'cad']);
  }

  salvar() {
    if (this.tipo.nome === undefined) {
      this.tipoTextBox.isValid = false;
      notify('O nome do tipo é obrigatório', 'error', 3000);
      return;
    }

    this.tipoService.save(this.tipo).subscribe(
      res => {
        if (res.ok) {
          this.tipo = res.body!
          notify('Salvo com sucesso', 'success', 3000);
        }
      },
      error => {
        notify('Não foi possível salvar, verifique sua conexão com a internet e com o banco de dados',
          'error', 3000);
      })
  }

}
