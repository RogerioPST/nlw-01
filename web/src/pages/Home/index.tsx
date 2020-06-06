import React from 'react'
import {FiLogIn} from 'react-icons/fi'
//qdo usamos o a href, recarrega a pagina.
//o Link eh usado para n recarregar a pagina
import {Link} from 'react-router-dom'

import logo from '../../assets/logo.svg'
//direto o nome do arquivo
import './styles.css'


const Home = () =>{
	return (
		<div id="page-home">
			<div className="content">
				<header>
				<img src={logo} alt="Ecoleta"/>
				</header>
				<main>
					<h1>Seu market place de coleta de resíduos</h1>
					<p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
					<Link to="/create-point">
						<span><FiLogIn /></span>
						<strong>Cadastre um ponto de coleta</strong>
					</Link>
				</main>
			</div>
		</div>
	)
}

export default Home
