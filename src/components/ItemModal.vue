<template>
    <div class="modal fade" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar produto</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Fechar"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="produto-nome" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="produto-name" v-model="formProduto.nome"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="produto-reponsavel" class="form-label">Responsável</label>
                            <input type="text" class="form-control" id="produto-reponsavel"
                                v-model="formProduto.reponsavel" required />
                        </div>
                        <div class="mb-3">
                            <label for="produto-categoria" class="form-label">Categoria</label>
                            <input type="text" class="form-control" id="produto-categoria"
                                v-model="formProduto.categoria" required />
                        </div>
                        <!-- Adicione outros campos do formulário conforme necessário -->

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// Importar Bootstrap para manipulação de modais
import { Modal } from 'bootstrap';
import axios from 'axios';

export default {
    props: {
        produto: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            formProduto: { ...this.produto },
        };
    },
    methods: {
        handleSubmit() {
            this.updateProduto();            
        },

        async createProduto() {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/produtos', {
                    name: this.novoProduto,
                });
                this.produtos.push(response.data);
                this.novoProduto = '';
            } catch (error) {
                console.error('Erro ao criar item:', error);
            }
        },

        async updateProduto(item) {
            try {
                await axios.put(`http://localhost:8080/api/v1/produtos/${this.formProduto.id}`, {
                    nome: this.formProduto.nome,
                    reponsavel: this.formProduto.reponsavel,
                    categoria: this.formProduto.categoria
                }).then(res => {
                    this.$emit('update-item', this.formProduto);
                });
            } catch (error) {
                console.error('Erro ao atualizar item:', error);
            }
            this.closeModal();
        },

        showModal() {
            const modalElement = this.$refs.modal;
            const bootstrapModal = new Modal(modalElement);
            bootstrapModal.show();
        },
        closeModal() {
            const modalElement = this.$refs.modal;
            const bootstrapModal = Modal.getInstance(modalElement);
            bootstrapModal.hide();
        },
    },
    watch: {
        produto(newProduto) {
            this.formProduto = { ...newProduto };
        },
    },
};
</script>

<style scoped>
.modal-content {
    background-color: #fff;
}
</style>