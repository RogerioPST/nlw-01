//qdo for lidar com caminhos dentro do node, usar a lib path
import path from 'path'

//path.resolve() resolve unindo as variaveis de dentro em um soh
//p qq sist operacional, 
//pois em algum SO a barra eh invertida

module.exports = {
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
	},
	migrations: {
		directory: path.resolve(__dirname, 'src', 'database', 'migrations')
	},
	seeds: {
		directory: path.resolve(__dirname, 'src', 'database', 'seeds')
	},
	useNullAsDefault: true
}


