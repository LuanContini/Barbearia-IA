export class VendaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        await this.model.carregarVendas();
        this.view.inicializar({
            onSubmit: this.handleSubmit.bind(this),
            onServicoChange: this.handleServicoChange.bind(this)
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const vendaData = this.view.getFormData();
            await this.model.adicionarVenda(vendaData);
            console.log(vendaData)
            this.view.mostrarPopup();
            this.view.limparFormulario();
        } catch (error) {
            console.error('Erro ao adicionar venda:', error);
            alert('Erro ao adicionar venda. Por favor, tente novamenteeeeeeeee.');
        }
    }

    handleServicoChange(event) {
        this.view.atualizarValor(event.target.value);
    }
}