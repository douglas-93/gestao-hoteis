import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxFileUploaderComponent, DxFormComponent} from "devextreme-angular";
import {EnderecoFormComponent} from "../../shared/components/endereco-form/endereco-form.component";
import {HotelModel} from "../../shared/models/hotel.model";
import {HotelService} from "../../shared/services/hotel.service";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {ImagemQuartoModel} from "../../shared/models/imagemQuarto.model";

@Component({
    selector: 'app-hotel', templateUrl: './hotel.component.html', styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

    @ViewChild('hotelForm') hotelForm: DxFormComponent;
    @ViewChild('enderecoForm') enderecoForm: EnderecoFormComponent;
    @ViewChild('fileUploader', {static: false}) fileUploader: DxFileUploaderComponent;

    mode: ModeEnum = ModeEnum.LIST;

    hotel: HotelModel;
    gridResult: HotelModel[] = [];
    protected readonly Utils = Utils;
    imgData: any[] = [];

    constructor(private router: Router, private hotelService: HotelService) {
    }

    ngOnInit() {
        let edit: boolean = this.router.url.includes('edit');
        this.mode = (this.router.url.includes('cad') || this.router.url.includes('edit')) ? ModeEnum.EDIT : ModeEnum.LIST;

        this.hotel = new HotelModel();

        if (edit) {
            this._findHotel(this.router.url.split('/').pop()!)
        }
    }

    buscar() {
        this.hotelService.findAll().subscribe(resp => {
            if (resp.ok) {
                this.gridResult = resp.body!
            }
        })
    }

    novo() {
        this.router.navigate(['hotel', 'cad'])
    }

    salvar() {
        let enderecoValido = this.enderecoForm.validateForm();
        let hotelValido = this.hotelForm.instance.validate().isValid;
        if (enderecoValido && hotelValido) {
            this.hotel.endereco = this.enderecoForm.getGridData();
            this.hotelService.save(this.hotel).subscribe(resp => {
                if (resp.ok) {
                    notify('Dados salvos com sucesso', 'success', 3600);
                    window.history.back();
                    return;
                }
            }, error => {
                notify(error.error.message, 'error', 3600);
            })
        } else {

            notify('Preencha todos os campos', 'error', 3600);

        }

    }

    private _findHotel(id: string) {

    }

    carregarArquivo(event: any): void {
        const files = event.value;

        if (files && files.length > 0) {
            const file = files[0];

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const base64Image = e.target.result;
                this.hotel.logoAsDataSource = base64Image; // Armazenar a URL da imagem
                this.hotel.logoMarca = file; // Armazenar o arquivo
            };

            reader.readAsDataURL(file);
        }

        this.fileUploader.instance.reset();
    }

    baixar() {
        const link = document.createElement('a');
        link.href = this.hotel.logoAsDataSource!;
        link.download = this.hotel.logoMarca?.name!;
        link.target = '_blank'; // Opcional: abre o link em uma nova guia
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    limparImagem() {
        this.hotel.logoAsDataSource = undefined;
        this.hotel.logoMarca = undefined;
    }
}
