import _ from "lodash";

export class Utils {
    static formatarCNPJ(cnpj: string): string {
        cnpj = cnpj.replace(/\D/g, '');
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return cnpj;
    }

    static formatarCPF(cpf: string): string {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        return cpf;
    }

    static formatarRG(rg: string): string {
        rg = rg.replace(/\D/g, '');
        rg = rg.replace(/([a-zA-Z]{2})(\d{2})(\d{3})(\d{3})/, '$1-$2.$3.$4');
        return rg;
    }

    static formatarTelefone(telefone: string): string {
        if (_.isNil(telefone)) {
            return '';
        }

        telefone = telefone.replace(/\D/g, '');
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        return telefone;
    }

    static formatarCelular(celular: string): string {
        if (_.isNil(celular)) {
            return '';
        }

        celular = celular.replace(/\D/g, '');
        celular = celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        return celular;
    }

    static diferencaEmDias(dataInicio, dataFim) {
        // Calcular a diferença em milissegundos
        const diferencaEmMilissegundos = Math.abs(dataFim.getTime() - dataInicio.getTime());

        // Converter a diferença em milissegundos para dias
        const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
        const diferencaEmDias = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos);

        return diferencaEmDias;
    }

    static formatarComoMoeda(valor: number): string {
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formatador.format(valor);
    }

    static formatFileSize(sizeInBytes: number | undefined): string {
        if (sizeInBytes != undefined) {
            const kilobyte = 1024;
            const megabyte = kilobyte * 1024;

            if (sizeInBytes < kilobyte) {
                return sizeInBytes + ' Bytes';
            } else if (sizeInBytes < megabyte) {
                return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
            } else {
                return (sizeInBytes / megabyte).toFixed(2) + ' MB';
            }
        }

        return '';
    }

    static gerarDatasSemana(deslocamento: number): Date[] {
        const datasSemana: Date[] = [];
        const hoje = new Date();
        const primeiroDiaSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay())); // Define o primeiro dia da semana

        for (let i = 0; i < 7; i++) {
            const data = new Date(primeiroDiaSemana);
            data.setDate(data.getDate() + i + (deslocamento * 7)); // Adiciona o deslocamento em semanas
            datasSemana.push(data);
        }

        return datasSemana;
    }

    static formatarDataParaString(data: Date): string {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do zero, por isso somamos 1
        const ano = data.getFullYear();
        const diaDaSemana = diasSemana[data.getDay()]; // Obtém o nome do dia da semana

        return `${dia}/${mes}/${ano}#${diaDaSemana}`;
    }

    static gerarDateAPartirDaString(string: string) {
        const parts: string[] = _.compact(string.split(" "));

// Mapear o mês abreviado para o número do mês
        const monthMap: { [key: string]: number } = {
            "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
            "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
        };

// Obter partes específicas da string
        const month: number = monthMap[parts[1]];
        const day: number = Number(parts[2]);
        const year: number = Number(parts[3]);

        return new Date(year, month, day);

    }
}
