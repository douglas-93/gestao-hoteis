import {Component, OnInit} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.scss']
})
export class QuartoComponent implements OnInit {
  mode: ModeEnum = ModeEnum.LIST;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let edit: boolean = this.router.url.includes('edit');
    this.mode = (this.router.url.includes('cad') ||
      this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

    if (edit) {
      this.findQuarto(this.router.url.split('/').pop()!)
    }
  }

  buscar() {

  }

  novo() {
    this.router.navigate(['quartos', 'cad'])
  }

  salvar() {

  }

  findQuarto(id: string) {

  }
}
