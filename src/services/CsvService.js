export class CsvService {
    static CSV_FILE = '../src/assets/vendas.csv';

    static async carregarVendas() {
        try {
            const response = await fetch(this.CSV_FILE);
            if (!response.ok) {
                throw new Error('Erro ao carregar arquivo CSV');
            }
            
            const csvText = await response.text();
            const linhas = csvText.split('\n').slice(1); // Ignora o cabeçalho
            
            return linhas
                .filter(linha => linha.trim()) // Remove linhas vazias
                .map(linha => {
                    const [profissional, data, servico, valor, metodoPagamento] = linha.split(',');
                    return {
                        profissional: profissional.trim(),
                        data: data.trim(),
                        servico: servico.trim(),
                        valor: parseFloat(valor),
                        metodoPagamento: metodoPagamento.trim()
                    };
                });
        } catch (error) {
            console.error('Erro ao carregar vendas:', error);
            throw new Error('Falha ao carregar dados de vendas');
        }
    }

    static async salvarVendas(vendas) {
        const csvContent = "Profissional,Data,Servico,Valor,MetodoPagamento\n" + 
        vendas.map(venda => 
            `${venda.profissional},${venda.data},${venda.servico},${venda.valor},${venda.metodoPagamento}`
        ).join('\n');

    try {
        const response = await fetch(this.CSV_FILE, {
            method: 'POST',
            body: csvContent,
            headers: {
                'Content-Type': 'text/csv'
            }
        });
        if (!response.ok) throw new Error('Falha ao salvar vendas');
    } catch (error) {
        console.error('Erro ao salvar vendas:', error);
        //alert('Erro ao salvar vendas. Por favor, tente novamenteeeeeeeeeee.');
    }
    }

    static formatarParaCSV(valor) {
        // Se o valor contiver vírgulas, envolve em aspas
        return valor.toString().includes(',') ? `"${valor}"` : valor;
    }

    static validarDadosVenda(venda) {
        const camposObrigatorios = ['profissional', 'data', 'servico', 'valor', 'metodoPagamento'];
        
        for (const campo of camposObrigatorios) {
            if (!venda[campo]) {
                throw new Error(`Campo obrigatório ausente: ${campo}`);
            }
        }

        if (isNaN(venda.valor) || venda.valor <= 0) {
            throw new Error('Valor inválido');
        }

        return true;
    }
}