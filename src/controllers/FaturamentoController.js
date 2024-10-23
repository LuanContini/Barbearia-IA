import { ConfigModel } from '../models/ConfigModel.js';
export class FaturamentoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.inicializar({
            onFiltroChange: this.handleFiltroChange.bind(this)
        });
        this.atualizarVisualizacoes();
    }

    handleFiltroChange() {
        this.atualizarVisualizacoes();
    }

    atualizarVisualizacoes() {
        const filtros = this.view.getFiltros();
        const vendasFiltradas = this.model.getVendasFiltradas(filtros);
        
        this.view.atualizarTabela(vendasFiltradas);
        
        const dadosFaturamento = ConfigModel.PROFISSIONAIS.map(profissional => {
            return vendasFiltradas
                .filter(venda => venda.profissional === profissional)
                .reduce((total, venda) => total + venda.valor, 0);
        });
        
        this.view.atualizarGrafico(dadosFaturamento);
    }
}