import React, {useState} from 'react'
import Header from './Header'

interface ExemploParaEntenderProps {
	titleObrigatorio: string,
	textoOpcional?: string
}

//React.FC = function component. o typescript q pede isso
const ExemploParaEntender : React.FC<ExemploParaEntenderProps> = (props) => {
//useState retorna um array, em que, na primeira posicao, retorna 
//o valor do estado e na segunda posicao, a função p atualizar o valor do estado
//[valor do estado, função p atualizar o valor do estado]
	const [counter, setCounter] = useState(0)

	const handleButtonClick = () =>{
		
		setCounter(counter+1)
	}

	return(
		<div>			
			<Header titleObrigatorio={`Contador : ${counter}`}/>
			<h1>{props.titleObrigatorio}</h1>
			<h1>{counter}</h1>
			<button type="button" onClick={handleButtonClick}>Aumentar</button>
		</div>
	)
}

export default ExemploParaEntender