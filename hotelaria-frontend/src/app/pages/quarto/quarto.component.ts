import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxListComponent, DxTextBoxComponent} from "devextreme-angular";

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.scss']
})
export class QuartoComponent implements OnInit {

  @ViewChild('itemTxBox') itemTxBox: DxTextBoxComponent;
  @ViewChild('listaItens') listaItens: DxListComponent;

  mode: ModeEnum = ModeEnum.LIST;
  img: string | ArrayBuffer | null;
  imgDataSource: string[] = [];
  imgData: any[] = [];

  constructor(private router: Router,
              private cdr: ChangeDetectorRef) {
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

  removerImagem(index: number) {
    // this.imgDataSource.splice(index, 1)[0];
    this.imgData.splice(index, 1)[0];
    this.cdr.detectChanges();
  }

  adicionaItemLista(){
    this.listaItens.items.push(this.itemTxBox.value);
    this.itemTxBox.value = '';
    this.listaItens.instance.repaint();
  }
}
