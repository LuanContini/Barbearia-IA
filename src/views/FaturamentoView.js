import { ConfigModel } from '../models/ConfigModel.js';

export class FaturamentoView {
    constructor() {
        this.tabela = document.querySelector('#tabela-faturamento tbody');
        this.grafico = null;
        this.filtrosContainer = document.getElementById('filtros-container');
    }

    inicializar(handlers) {
        this.preencherFiltros();
        this.configurarEventListeners(handlers);
        this.showPage('visualizar');
    }

    preencherFiltros() {
        const { PROFISSIONAIS, METODOS_PAGAMENTO } = ConfigModel;
        this.preencherSelect('filtro-profissional', ['Todos', ...PROFISSIONAIS]);
        this.preencherSelect('filtro-metodo-pagamento', ['Todos', ...METODOS_PAGAMENTO]);
    }

    configurarEventListeners(handlers) {
        document.getElementById('handleFiltro').addEventListener('click', handlers.onFiltroChange);

        document.getElementById('link-inserir').addEventListener('click', (event) => {
            event.preventDefault();
            this.showPage('inserir');
        });
        document.getElementById('link-visualizar').addEventListener('click', (event) => {
            event.preventDefault();
            this.showPage('visualizar');
        });
    }

    // Funções de navegação
    showPage(pageId) {
        document.getElementById('inserir').style.display = pageId === 'inserir' ? 'block' : 'none';
        document.getElementById('visualizar').style.display = pageId === 'visualizar' ? 'block' : 'none';
    
        if (pageId === 'visualizar') {
            atualizarTabelaFaturamento();
            atualizarGrafico();
        }
    }

    // Funções para visualização do faturamento
atualizarTabelaFaturamento() {
    const tbody = document.querySelector('#tabela-faturamento tbody');
    tbody.innerHTML = '';
    let totalVendas = 0;

    vendas.forEach(venda => {
        if (passaFiltros(venda)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${venda.profissional}</td>
                <td>${venda.data}</td>
                <td>${venda.servico}</td>
                <td>R$ ${venda.valor.toFixed(2)}</td>
                <td>${venda.metodoPagamento}</td>
            `;
            tbody.appendChild(tr);
            totalVendas += venda.valor;
        }
    });

    document.getElementById('total-vendas').textContent = totalVendas.toFixed(2);
}

    atualizarTabela(vendas) {
        this.tabela.innerHTML = '';
        let totalVendas = 0;

        vendas.forEach(venda => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${venda.profissional}</td>
                <td>${venda.data}</td>
                <td>${venda.servico}</td>
                <td>R$ ${venda.valor.toFixed(2)}</td>
                <td>${venda.metodoPagamento}</td>
            `;
            this.tabela.appendChild(tr);
            totalVendas += venda.valor;
        });

        document.getElementById('total-vendas').textContent = totalVendas.toFixed(2);
    }
    preencherSelect(id, opcoes) {
        const select = document.getElementById(id);
        select.innerHTML = ''; // Limpa opções existentes
        opcoes.forEach(opcao => {
            const option = document.createElement('option');
            option.textContent = typeof opcao === 'string' ? opcao : opcao.nome;
            option.value = typeof opcao === 'string' ? opcao : opcao.nome;
            select.appendChild(option);
        });
    }

    atualizarGrafico(dadosFaturamento) {
        const ctx = document.getElementById('grafico-faturamento').getContext('2d');
        
        if (this.grafico) {
            this.grafico.destroy();
        }

        this.grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ConfigModel.PROFISSIONAIS,
                datasets: [{
                    label: 'Faturamento por Profissional',
                    data: dadosFaturamento,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Faturamento (R$)'
                        }
                    }
                }
            }
        });
    }

    getFiltros() {
        return {
            profissional: document.getElementById('filtro-profissional').value,
            dataInicio: document.getElementById('filtro-data-inicio').value,
            dataFim: document.getElementById('filtro-data-fim').value,
            metodoPagamento: document.getElementById('filtro-metodo-pagamento').value
        };
    }
}