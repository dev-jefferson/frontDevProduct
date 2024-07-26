<script setup>
import ListaProduto from '../components/ListaProduto.vue'
</script>

<template>
  <nav class="navbar bg-body-tertiary">
		<div class="container-fluid">
			<span class="navbar-brand mb-0 h1">CRUD Gerenciador de produtos</span>
		</div>
	</nav>
	<br>
	<br>
  <div class="container">
    <div class="row">
      <div class="card">
        <div class="card-header">
          Produtos
        </div>
        <div class="card-body">
          <ListaProduto />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produtos: [],
      novoProduto: '',
    };
  },
  methods: {
    
    async deleteItem(id) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/produtos/${id}`);
        this.produtos = this.produtos.filter((item) => item.id !== id);
      } catch (error) {
        console.error('Erro ao excluir item:', error);
      }
    },
  },
};
</script>
