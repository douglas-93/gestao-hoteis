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
        telefone = telefone.replace(/\D/g, '');
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        return telefone;
    }

    static formatarCelular(celular: string): string {
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
}
