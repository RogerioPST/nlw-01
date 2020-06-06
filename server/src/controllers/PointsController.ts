//importacao necessaria por conta do typescript
import {Request, Response} from 'express'

import knex from '../database/connection'

class PointsController{
	async index (request: Request, response: Response){
		const points = await knex('points')	

		const serializedPoints = points.map(point =>{
			return {
				...point,				
				image_url: `http://192.168.0.9:3333/uploads/${point.image}`
			}
		})
	

	return response.json(serializedPoints)
	}
	async filtered (request: Request, response: Response){
//filtros de UF, city, items - query params
const { city, uf, items} = request.query
console.log(city, uf, items)
const parsedItems = String(items)
.split(',')
.map(item=> Number(item.trim()))

const points = await knex('points')
	.join('point_items', 'points.id', '=', 'point_items.point_id')
	.whereIn('point_items.item_id', parsedItems)
	.where('city', String(city))
	.where('uf', String(uf))
	.distinct()
	.select('points.*')

return response.json(points)

	}
	async show (request: Request, response: Response){
		const id = request.params.id
		//ou const {id} = request.params

		const point = await knex('points').where('id', id).first()
		if (!point){
			return response.status(400).json({
				message: 'Point not found'
			})
		}

		const serializedPoint = {		
			...point,				
			image_url: `http://192.168.0.9:3333/uploads/${point.image}`
		}		

		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('items.title')
		return response.json({point: serializedPoint, items})
	}
	async create (request: Request, response: Response) {
		const {
			name, email, whatsapp, latitude, longitude, city, uf, items
		} = request.body
	
	//qdo uma insercao depende da outra, usar o transaction do knex
	//trx , no caso, no lugar de onde era knex.insert()
	//qdo usar transaction, PRECISA do COMMIT!!	
		const trx = await knex.transaction()	
		const point ={			
			image: request.file.filename,
			name, 
			email, 
			whatsapp, 
			latitude, 
			longitude, 
			city, 
			uf
		}
		//o metodo de insert do knex retorna os insertedIds inseridos
		//como no caso foi soh um, 
		const insertedIds = await trx('points').insert(point)
	
		const point_id = insertedIds[0]
	
		const pointItems = items
			.split(',')
			.map((item : string) => Number(item.trim()))
			.map((item_id: number) =>{
			return {
				item_id, 
				point_id
			}
		})
	
		await trx('point_items').insert(pointItems)
		await trx.commit()
	
		//com spread operator, retorno o q tem no obj point + o point_id
		return response.json({
			id: point_id,
			...point,

		})
	}
}

export default PointsController