import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModeEnum} from "../../shared/enums/mode.enum";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  mode: ModeEnum = ModeEnum.LIST
  protected readonly ModeEnum = ModeEnum;
  categorias: any[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.mode = (this.router.url.includes('cad') ||
      this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;
  }

  buscar() {
    notify('Buscou', 'success', 2000)
  }

  novo() {
    this.router.navigate(['categoria', 'cad']);
  }
}
