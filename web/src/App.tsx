import React from 'react';
import './App.css';
import ExemploParaEntender from './ExemploParaEntender'
import Header from './Header'
import Routes from './routes'

function App() {
	
  return (		
		<div>
			<Header titleObrigatorio='Titulo vindo do App'/>
			<ExemploParaEntender titleObrigatorio="Outro titulo vindo por props!!!!"/>			
			<Routes />
		</div>
  );
}

export default App;
