import { CsvService } from '../services/CsvService.js';

export class VendaModel {
    constructor() {
        this.vendas = [];
    }

    async carregarVendas() {
        this.vendas = await CsvService.carregarVendas();
    }

    async adicionarVenda(venda) {
        this.vendas.push(venda);
        await CsvService.salvarVendas(this.vendas);
    }

    getVendasFiltradas(filtros) {
        return this.vendas.filter(venda => this.passaFiltros(venda, filtros));
    }

    passaFiltros(venda, filtros) {
        const profissional = document.getElementById('filtro-profissional').value;
        const dataInicio = document.getElementById('filtro-data-inicio').value;
        const dataFim = document.getElementById('filtro-data-fim').value;
        const metodoPagamento = document.getElementById('filtro-metodo-pagamento').value;

        return (profissional === 'Todos' || venda.profissional === profissional) &&
            (!dataInicio || venda.data >= dataInicio) &&
            (!dataFim || venda.data <= dataFim) &&
            (metodoPagamento === 'Todos' || venda.metodoPagamento === metodoPagamento);
        }
        
    }
