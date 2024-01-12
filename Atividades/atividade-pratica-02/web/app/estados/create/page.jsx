'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function criarEstados() {


    const {push} = useRouter()

    const [nome, setNome] = useState('')
    const [sigla, setSigla] = useState('')

    
const salvarDadosEstado = async (event) => {
    event.preventDefault()

    const data = {
        nome,
        sigla
    }
    console.log(data)

    try{
        const response = await axios.post('http://localhost:3333/estado', data)
        alert(`${response.data.sucesso}`)
        push('/estados/list')
    }catch(error){
        console.log(error)
    }
    
}

  return(
    <div className="container col-md-9 p-5">
    <h1>Cadastro de Estado: {}</h1>

    <form onSubmit={salvarDadosEstado} >
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Nome</label>
            <input type="text"value={nome} className="form-control"  placeholder='Informe o nome do estado' onChange={(event) => { setNome(event.target.value) }} required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Sigla</label>
            <input type="text" value={sigla} className="form-control"  placeholder='Informe a sigla do estado 'onChange={(event) => { setSigla(event.target.value) }} required />
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar Estado</button>
    </form>
   </div>
    
  )
}