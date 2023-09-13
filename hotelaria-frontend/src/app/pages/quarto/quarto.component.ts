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
  img: string | ArrayBuffer | null;
  imgDataSource: string[] = [];

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

  carregarArquivo(e: any) {
    this.imgDataSource = []
    const arquivos: File[] = e.value
    arquivos.forEach(a => {
      this.lerArquivo(a)
    })
  }

  lerArquivo(arquivo?: File) {
    if (arquivo) {
      let url: string | ArrayBuffer;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target!.result;
        /* pegando a url para o atributo */
        this.imgDataSource.push(<string>result!);
      };
      reader.readAsDataURL(arquivo);
    }
  }

}
