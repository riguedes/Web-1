"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

async function recuperarCidadeID(id){
    return await axios.get(`http://localhost:3333/cidade/${id}`)
}

const recuperarListaEstado= async () => {
    return await axios.get(`http://localhost:3333/estado`)
} 

export default function editarCidade({params}){

    const { push } = useRouter()
    const id = params.id

    const [cidade, setCidade] = useState({})
    const [nome, setNome] = useState('')
    const [estado, setEstado] = useState([])
    const [estadoID, setEstadoID] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const cidade = await recuperarCidadeID(id)
            const listaEstado = await recuperarListaEstado()
            setEstado(listaEstado.data)
            setCidade(cidade.data);
            setNome(cidade.data.nome);
            setEstadoID(cidade.data.estadoID._id);
        
        };

        fetchData();
    }, [id]);

    const editarDadosCidade = async (event) => {

        event.preventDefault()
    
        const data = {
            nome,
            estadoID
        }
    
        try{
            const response = await axios.put(`http://localhost:3333/cidade/${id}`, data)
            console.log(data)
            alert(`${response.data.sucesso}`)
            push('/cidades/list')
        }catch(error){
            console.log(error)
        }
        
    }
    
    return(
        
    <div className="container col-md-9 p-5">
    <h1>Edição de Cidade {nome} </h1>

    <form onSubmit={editarDadosCidade} >
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
    
            <button type="submit" className="btn btn-primary">Editar cidade</button>
        </form>
       </div>
        
      )
  
}