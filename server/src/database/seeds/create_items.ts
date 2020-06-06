//funcionalidade p ja criar alguns itens no banco de dados
import Knex from 'knex'

export async function seed(knex: Knex){
	await knex('items').insert([
		{title: 'Lâmpadas', image: 'lampadas.svg'},
		{title: 'Pilhas e Baterias', image: 'baterias.svg'},
		{title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
		{title: 'Eletrônicos', image: 'eletronicos.svg'},
		{title: 'Orgânicos', image: 'organicos.svg'},
		{title: 'Óleo de Cozinha', image: 'oleo.svg'},
	])
}