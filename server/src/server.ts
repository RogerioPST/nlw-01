import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import {errors} from 'celebrate'

const app = express()

//dessa forma, permite todas URL acessarem, pois estamos em des
//se estivesse em producao, colocaria um obj dentro dele como
//{	origin: 'www.meusite.com'}
app.use(cors())
//necessario p o express entender json
app.use(express.json())
//para enxergar as rotas, usar o codigo abaixo
app.use(routes)
//para fazer uma rota p arquivos estaticos, usar o express.static
//para voltar um diretorio com o path.resolve, usar '..' = ../
app.use('/uploads', express.static(path.resolve(__dirname,'..', 'uploads')))

app.use(errors())
app.listen(3333)