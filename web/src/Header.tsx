import React from 'react'

interface HeaderProps {
	titleObrigatorio: string,
	textoOpcional?: string
}

//React.FC = function component. o typescript q pede isso
const Header : React.FC<HeaderProps> = (props) => {
	return(
		<header>
			<h1>{props.titleObrigatorio}</h1>						
		</header>
	)
}

export default Header