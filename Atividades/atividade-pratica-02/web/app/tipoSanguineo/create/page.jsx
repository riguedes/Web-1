'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function criarTipoSanguineo() {


    const {push} = useRouter()

    const [tipo, setTipo] = useState('')
    const [fator, setFator] = useState('')

    
const salvarDadosTipoSanguineo = async (event) => {
    event.preventDefault()

    const data = {
        tipo: tipo,
        fator: fator
    }

    try{
        const response = await axios.post('http://localhost:3333/sanguineo', data)
        alert(`${response.data.sucesso}`)
         push('/tipoSanguineo/list')
    }catch(error){
        console.log(error)
    }
    
}

  return(
    <div className="container col-md-9 p-5">
    <h1>Cadastro de Tipos Sanguineos: {}</h1>

    <form onSubmit={salvarDadosTipoSanguineo} >
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Tipo</label>
            <input type="text"value={tipo} className="form-control"  placeholder='Informe o tipo sanguineo' onChange={(event) => { setTipo(event.target.value) }} required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Fator</label>
            <input type="text" value={fator} className="form-control"  placeholder='Informe o fator 'onChange={(event) => { setFator(event.target.value) }} required />
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar tipo sanguineo</button>
    </form>
   </div>
    
  )
}