import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() filtrar = new EventEmitter();
  @Output() novoCadastro = new EventEmitter();
  @Output() salvar = new EventEmitter();
  @Output() deletar = new EventEmitter();

  @Input() cadastro: boolean;

  @Input() desativarBotaoFechar: boolean;

  edit: boolean;

  constructor(private router: Router) {
    this.edit = this.router.url.includes('edit/')
  }

  filtrarEnv(e: any) {
    this.filtrar.emit(e)
  }

  novoCadEnv(e: any) {
    this.novoCadastro.emit(e)
  }

  salvaEnv(e: any) {
    this.salvar.emit(e)
  }

  deleteEnv(e: any) {
    this.deletar.emit(e)
  }

  voltar() {
    window.history.back();
  }

}
