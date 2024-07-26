<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';
import ItemModal from './ItemModal.vue';
</script>

<template>
	<table class="table table-hover">
		<thead>
			<tr>
				<th scope="col">ID</th>
				<th scope="col">Nome</th>
				<th scope="col">Responsável</th>
				<th scope="col">Data Criação</th>
				<th scope="col">Data Modificação</th>
				<th scope="col">Categoria</th>
				<th scope="col" class="text-center">
					<button type="button" class="btn btn-sm btn-outline-primary">
						Cadastrar
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="produto in produtos" :key="produto.id">
				<th scope="row">{{ produto.id }}</th>
				<td>{{ produto.nome }}</td>
				<td>{{ produto.reponsavel }}</td>
				<td>{{ produto.data_criacao }}</td>
				<td>{{ produto.data_modificacao }}</td>
				<td>{{ produto.categoria }}</td>
				<td class="text-center">
					<button type="button" class="btn btn-outline-warning" data-bs-toggle="tooltip"
						data-bs-placement="bottom" data-bs-title="Editar" @click="openModal(produto)">
						<font-awesome-icon :icon="['fas', 'edit']" />
					</button>
					<button type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip"
						data-bs-placement="bottom" data-bs-title="Remover">
						<font-awesome-icon :icon="['fas', 'trash']" />
					</button>
				</td>
			</tr>

		</tbody>
	</table>

	<!-- Componente de modal -->
    <ItemModal
      :produto="prodSelect"
      ref="itemModal"
      @update-item="updateItem"
    />
</template>


<script>

export default {
  data() {
    return {
      produtos: [],
      novoProduto: '',
	  prodSelect: null,
    };
  },

  created() {
    this.fetchItems();
  },


  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/produtos');
        this.produtos = response.data;

        console.log(this.produtos)
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    },
	openModal(produto) {
      this.prodSelect = { ...produto }; 
      this.$refs.itemModal.showModal();
    },
  },
};
</script>
