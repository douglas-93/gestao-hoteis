import {Component, OnInit, ViewChild} from '@angular/core';
import {ModeEnum} from "../../shared/enums/mode.enum";
import {Router} from "@angular/router";
import {DxFileUploaderComponent, DxFormComponent} from "devextreme-angular";
import {EnderecoFormComponent} from "../../shared/components/endereco-form/endereco-form.component";
import {HotelModel} from "../../shared/models/hotel.model";
import {HotelService} from "../../shared/services/hotel.service";
import notify from "devextreme/ui/notify";
import {Utils} from "../../shared/Utils";
import {ArquivoDIgitalModel} from "../../shared/models/ArquivoDIgitalModel";
import _ from "lodash";
import {ArquivoDigitalService} from "../../shared/services/arquivoDigitalService";

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
    imgData: any[] = [];
    file: File | undefined;
    arquivoDigital: ArquivoDIgitalModel;
    hotelSelecionado: HotelModel;
    protected readonly Utils = Utils;

    constructor(private router: Router,
                private hotelService: HotelService,
                private arquivoDigitalService: ArquivoDigitalService) {
    }

    ngOnInit() {
        this.mode = ModeEnum.EDIT;
        this.hotel = new HotelModel();

        this.hotelService.findLastId().subscribe({
            next: (resp) => {
                if (resp.ok && resp.body! != 0) {
                    this.findHotel(resp.body!);
                }
            }
        })
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

            if (!_.isUndefined(this.file)) {
                this.arquivoDigitalService.saveFile(this.file).subscribe(
                    (resp) => {
                        if (resp.ok && resp.status === 201) {
                            this.hotel.logoMarcaId = resp.body?.id!
                            this.salvarHotel(this.hotel);
                        }
                    },
                    (error) => {
                        notify('Não foi possível salvar a logo marca', 'error', 3600);
                        return;
                    }
                )
            } else {
                this.salvarHotel(this.hotel);
            }

        } else {

            notify('Preencha todos os campos', 'error', 3600);

        }

    }

    salvarHotel(entity: HotelModel) {
        this.hotelService.save(entity).subscribe(resp => {
            if (resp.ok) {
                notify('Dados salvos com sucesso', 'success', 3600);
                window.history.back();
                return;
            }
        }, error => {
            notify(error.error.message, 'error', 3600);
            return;
        })
    }

    findHotel(id: number) {
        let idAsNumber: number = Number(id);
        this.hotelService.findById(idAsNumber).subscribe(
            (resp) => {
                this.hotel = resp.body!
                this.enderecoForm.setGridData(this.hotel.endereco);
                if (!_.isNil(this.hotel.logoMarcaId)) {
                    this.arquivoDigitalService.findById(this.hotel.logoMarcaId).subscribe(
                        (resp) => {
                            if (resp.ok) {
                                this.arquivoDigital = resp.body!;
                                this.hotel.logoAsDataSource = `data:${this.arquivoDigital.tipo};base64,${this.arquivoDigital.dados}`;
                                this.file = new File([this.arquivoDigital.dados], this.arquivoDigital.nome,
                                    {type: this.arquivoDigital.tipo});
                            }
                        },
                        (error) => {
                            notify('Erro ao carregar logomarca!', 'error', 3600);
                        }
                    );
                }
            },
            (error) => {
                notify('Erro ao carregar Hotel!', 'error', 3600);
            }
        )
    }

    carregarArquivo(event: any): void {
        const files = event.value;

        if (files && files.length > 0) {
            const file = files[0];
            this.file = file;
            const arquivoDigital: ArquivoDIgitalModel = new ArquivoDIgitalModel();
            arquivoDigital.dados = file;
            arquivoDigital.tipo = file.type;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.hotel.logoAsDataSource = e.target.result; // Armazenar a URL da imagem
            };

            reader.readAsDataURL(<File>arquivoDigital.dados);
        }

        this.fileUploader.instance.reset();
    }

    baixar() {
        const link = document.createElement('a');
        link.href = this.hotel.logoAsDataSource!;
        link.download = this.file!.name;
        link.target = '_blank'; // Opcional: abre o link em uma nova guia
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    limparImagem() {
        this.hotel.logoAsDataSource = undefined;
        this.file = undefined;
    }

    selecionaHotel(event: any) {
        event.component.byKey(event.currentSelectedRowKeys[0]).done(hotel => {
            if (hotel) {
                this.hotelSelecionado = hotel;
            }
        });
    }
}
