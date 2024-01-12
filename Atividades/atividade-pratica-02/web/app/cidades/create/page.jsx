'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';


const recuperarListaEstado= async () => {
  return await axios.get(`http://localhost:3333/estado`)
}

export default function criarCidades() {


    const {push} = useRouter()

    const [nome, setNome] = useState('')
    const [estado, setEstado] = useState([])
    const [estadoID, setEstadoID] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaEstado()
            setEstado(lista.data);
            console.log(lista.data)
        };

        fetchData();
    }, []);


    
const salvarDadosCidade = async (event) => {
    event.preventDefault()

    const data = {
        nome,
        estadoID
    }

    try{
        const response = await axios.post('http://localhost:3333/cidade', data)
        alert(`${response.data.sucesso}`)
        push('/cidades/list')
    }catch(error){
        console.log(error)
    }
    
}

  return(
    <div className="container col-md-9 p-5">
    <h1>Cadastro de Cidade {}</h1>

    <form onSubmit={salvarDadosCidade} >
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Nome</label>
            <input type="text"value={nome} className="form-control"  placeholder='Informe o nome da cidade' onChange={(event) => { setNome(event.target.value) }} required />
        </div>

        <div className='mb-3'>
            <label htmlFor="estado">Estado</label>
                <select className="form-select" aria-label="Default select example" name="estadoID" value={estadoID} onChange={(event) => setEstadoID(event.target.value)}>
                    <option value="" selected disabled> Selecione</option>
                        {
                            estado.map((valor) => {
                                return (
                                    <option key={valor._id} value={valor._id}> {valor.nome}- {valor.sigla} </option>
                                )
                            })
                        }
                    </select>
        </div>
        

        <button type="submit" className="btn btn-primary">Cadastrar Cidade</button>
    </form>
   </div>
    
  )
}