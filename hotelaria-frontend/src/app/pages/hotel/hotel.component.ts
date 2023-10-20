import {Component, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxFormComponent} from "devextreme-angular";
import {EnderecoFormComponent} from "../../shared/components/endereco-form/endereco-form.component";
import {HotelModel} from "../../shared/models/hotel.model";
import {HotelService} from "../../shared/services/hotel.service";
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-hotel', templateUrl: './hotel.component.html', styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
    @ViewChild('hotelForm') hotelForm: DxFormComponent;
    @ViewChild('enderecoForm') enderecoForm: EnderecoFormComponent;

    mode: ModeEnum = ModeEnum.LIST;

    hotel: HotelModel;
    gridResult: HotelModel[] = [];

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

    formatarCNPJ(cnpj: string): string {
        cnpj = cnpj.replace(/\D/g, '');
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return cnpj;
    }

    formatarCPF(cpf: string): string {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return cpf;
    }
}
