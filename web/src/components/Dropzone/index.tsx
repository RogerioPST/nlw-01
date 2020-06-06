import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'

import './styles.css'

interface Props{
	onFileUploaded: (file: File) => void;
}

const Dropzone : React.FC<Props> = (props) =>{
	const onFileUploaded =  props.onFileUploaded
	const [selectedFileUrl, setSelectedFileUrl] = useState('')
//useCallback serve p memorizar uma funcao p q ela seja recarregada
//, recriada somente qdo algum valor de uma variavel mudar
//pq por padrao, qdo a gente cria uma fc nova dentro de um componente 
//do react, sempre q um estado mudar ou qq coisa mudar, essa funcao 
//eh recriada na memoria do zero
	const onDrop = useCallback(acceptedFiles =>{
		console.log(acceptedFiles)
		const file = acceptedFiles[0]
		const fileUrl = URL.createObjectURL(file)
		setSelectedFileUrl(fileUrl)
		onFileUploaded(file)
	},[onFileUploaded])

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: 'image/*'
})

	return (
		<div className="dropzone" {...getRootProps()}>
			<input {...getInputProps()} accept='image/*' />
		{/* 	<p><FiUpload />Imagem do estabelecimento</p> */}
		{selectedFileUrl 
			? <img src={selectedFileUrl} alt="point thumbnail" />
			: <p><FiUpload />Imagem do estabelecimento</p>
		}
		{/* 	{
				isDragActive ?
				<p>
					<FiUpload />
					Drop the files here ...</p> :
				<p>	<FiUpload />Drag 'n' drop some files here or click to select files</p>				
			} */}
		</div>
	)
}

export default Dropzone