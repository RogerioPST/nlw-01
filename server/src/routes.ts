import express from 'express'
//para validação.
import {celebrate, Joi} from 'celebrate'

import multer from 'multer'
import multerConfig from './config/multer'

import knex from './database/connection'
import PointsController from '../src/controllers/PointsController'
import ItemsController from '../src/controllers/ItemsController'

//o routes entra no lugar do app e td continua funcionando,
//desde q eu exporte o routes para o server.ts
const routes = express.Router()

const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()
//Rota: endereço completo da requisição
//Recurso: qual entidade estamos acessando do sistema.
const users = [
	'Rogerio', 
	'Diego', 
	'Cleiton',
	'Robson'		
]
routes.get('/', (request, response) =>{
	return response.json({message: 'hello world'})
})
//Tipos de parametros:
// Request param: parâmetros que vem na propria rota que 
//identificam um recurso
//query params: parametros q vem na propria rota
//geralmente opcionais p filtros, paginacao.
//Request body: parametros p criação, atualização de informações./todo resto!
routes.get('/users', (request, response) =>{
//os query params podem ser duplicados. por isso, a linha abaixo
//pode ser um array. sabendo q unico, envolver c String	
	const search = String(request.query.search)
	console.log("users", users)
//query params podem ser opcionais. por isso,o IF ternário abaixo	
	const filteredUsers = search ? users.filter(user => user.includes(search)) : users	
	console.log('list of users')
	console.log('filtrados', filteredUsers)
	//colocar return junto ao response qdo formos devolver a
	//resposta p o nosso cliente, o browser, e p o codigo parar aqui.
	return response.json(filteredUsers)
})
routes.get('/users/:id', (request, response) =>{
	const id = Number(request.params.id)
	const user = users[id]
	return response.json(user)
})
routes.post('/users', (request, response) =>{
//info p criacao de usuario, alteracao, senha vem no body	
	const data = request.body
	const user ={
		name: data.name,
		email: data.email
	}
	return response.json(user)
})
//padrao da comunidade para metodos:
//index - para listagem
//show- qdo exibir um unico registro
//create, update, delete/destroy
routes.get('/items', itemsController.index)
routes.get('/points', pointsController.filtered)
routes.get('/allpoints', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post(
	'/points',
	upload.single('image') , 
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),			
			items: Joi.string().required(),			
		},)
	},{abortEarly: false}
	),
	pointsController.create)

export default routes
/*
{
	"name": "Mercado Seu Ze", 
	"email": "contato@impe.com", 
	"whatsapp": "47999258635", 
	"latitude": -46.81273, 
	"longitude": -35.1923, 
	"city": "Sao Paulo", 
	"uf": "SP", 
	"items":[6]
}
*/