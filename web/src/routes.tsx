import React from 'react'
//lembrando q dependendo do tipo de rota, pode precisar importar
//outro Router
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

const Routes = () =>{
	return(
		<BrowserRouter>
			<Route component={Home} path='/' exact/>
			<Route component={CreatePoint} path='/create-point'/>
		</BrowserRouter>
	)
}

export default Routes