import knex from 'knex'
//qdo for lidar com caminhos dentro do node, usar a lib path
import path from 'path'

//path.resolve() resolve unindo as variaveis de dentro em um soh
//p qq sist operacional, 
//pois em algum SO a barra eh invertida

const connection = knex({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'database.sqlite')
	},
	useNullAsDefault: true
})

export default connection