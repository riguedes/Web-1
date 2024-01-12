"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

async function recuperarEstadoID(id){
    return await axios.get(`http://localhost:3333/estado/${id}`)
}
export default function editarEstado({params}){

    const { push } = useRouter()
    const id = params.id

    const [nome, setNome] = useState('')
    const [sigla, setSigla] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const estado = await recuperarEstadoID(id)
            setNome(estado.data.nome)
            setSigla(estado.data.sigla)
           
        };

        fetchData();
    }, [id]);

    const editarDadosEstado = async (event) => {

        event.preventDefault()
    
        const data = {
            nome,
            sigla
        }


    
        try{
            const response = await axios.put(`http://localhost:3333/estado/${id}`, data)
            alert(`${response.data.sucesso}`)
            push('/estados/list')
        }catch(error){
            console.log(error)
        }
        
    }
    
      return(
        <div className="container col-md-9 p-5">
        <h1>Editar estado: {nome} - {sigla}</h1>


        <form onSubmit={editarDadosEstado} >
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="htmlForm-label">Tipo</label>
                <input type="text"value={nome} className="form-control"  placeholder='Informe o tipo sanguineo' onChange={(event) => { setNome(event.target.value) }} required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="htmlForm-label">Fator</label>
                <input type="text" value={sigla} className="form-control"  placeholder='Informe o fator 'onChange={(event) => { setSigla(event.target.value) }} required />
            </div>
    
            <button type="submit" className="btn btn-primary">Editar estado</button>
        </form>
       </div>
        
      )
  
}