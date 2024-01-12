'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';


const recuperarListaCidade= async () => {
  return await axios.get(`http://localhost:3333/cidade`)
}

export default function criarLocalColeta() {


    const {push} = useRouter()

    const [nome, setNome] = useState('')
    const [rua, setRua] = useState([])
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cidade, setCidade] = useState([])
    const [cidadeID, setCidadeID] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaCidade()
            setCidade(lista.data);
        };

        fetchData();
    }, []);


    
const salvarDadosLocalDeColeta = async (event) => {
    event.preventDefault()

    const data = {
        nome,
        rua,
        numero,
        complemento,
        cidadeID
    }

    try{
        const response = await axios.post('http://localhost:3333/coleta', data)
        alert(`${response.data.sucesso}`)
        push('/coleta/list')
    }catch(error){
        alert(`${error}`)
    }
    
}

  return(
    <div className="container col-md-9 p-5">
    <h1>Cadastro de Local de coleta  {}</h1>

    <form onSubmit={salvarDadosLocalDeColeta} >
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Nome</label>
            <input type="text"value={nome} className="form-control"  placeholder='Informe o nome do local de coleta' onChange={(event) => { setNome(event.target.value) }} required />
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Rua</label>
            <input type="text"value={rua} className="form-control"  placeholder='Informe a rua' onChange={(event) => { setRua(event.target.value) }} required />
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Numero</label>
            <input type="number"value={numero} className="form-control"  placeholder='Informe o numero' onChange={(event) => { setNumero(event.target.value) }} required />
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Complemento</label>
            <input type="text"value={complemento} className="form-control"  placeholder='Informe o complemento' onChange={(event) => { setComplemento(event.target.value) }} required />
        </div>

        <div className='mb-3'>
            <label htmlFor="estado">Cidade</label>
                <select className="form-select" aria-label="Default select example" name="estadoID" value={cidadeID} onChange={(event) => setCidadeID(event.target.value)}>
                    <option value="" selected disabled> Selecione</option>
                        {
                            cidade.map((valor) => {
                                return (
                                    <option key={valor._id} value={valor._id}> {valor.nome}</option>
                                )
                            })
                        }
                    </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar local de coleta</button>
    </form>
   </div>
    
  )
}