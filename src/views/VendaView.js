import { ConfigModel } from '../models/ConfigModel.js';

export class VendaView {
    constructor() {
        this.form = document.getElementById('venda-form');
        this.popup = document.getElementById('popup');
    }

    inicializar(handlers) {
        this.preencherSelects();
        this.configurarEventListeners(handlers);
        //showPage('inserir');
    }

    preencherSelects() {
        const { PROFISSIONAIS, SERVICOS, METODOS_PAGAMENTO } = ConfigModel;
        this.preencherSelect('profissional', PROFISSIONAIS);
        this.preencherSelect('servico', SERVICOS.map(s => s.nome));
        this.preencherSelect('metodo-pagamento', METODOS_PAGAMENTO);
    }

    // Funções de navegação
   showPage(pageId) {
    document.getElementById('inserir').style.display = pageId === 'inserir' ? 'block' : 'none';
    document.getElementById('visualizar').style.display = pageId === 'visualizar' ? 'block' : 'none';

    /*if (pageId === 'visualizar') {
        atualizarTabelaFaturamento();
        atualizarGrafico();
    }*/ 
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

    configurarEventListeners(handlers) {
        this.form.addEventListener('submit', handlers.onSubmit);
        document.getElementById('servico').addEventListener('change', handlers.onServicoChange);

        document.getElementById('link-inserir').addEventListener('click', (event) => {
            event.preventDefault();
            this.showPage('inserir');
        });
        document.getElementById('link-visualizar').addEventListener('click', (event) => {
            event.preventDefault();
            this.showPage('visualizar');
        });
    }

    getFormData() {
        return {
            profissional: document.getElementById('profissional').value,
            data: document.getElementById('data').value,
            servico: document.getElementById('servico').value,
            valor: parseFloat(document.getElementById('valor').value),
            metodoPagamento: document.getElementById('metodo-pagamento').value
        };
    }

    mostrarPopup() {
        this.popup.style.display = 'block';
        setTimeout(() => {
            this.popup.style.display = 'none';
        }, 2000);
    }

    limparFormulario() {
        this.form.reset();
        document.getElementById('valor').value = '';
    }

    atualizarValor(servicoSelecionado) {
        const servico = ConfigModel.SERVICOS.find(s => s.nome === servicoSelecionado);
        document.getElementById('valor').value = servico ? servico.valor : '';
    }
}