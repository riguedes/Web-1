'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios'
import {  useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

async function recuperarListaEstados(){
    return await axios.get('http://localhost:3333/estado')
}

export default function ListaTipoSanguineo() {

    const { push } = useRouter()

       
    const [listaEstado, setListaEstado] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaEstados()
            setListaEstado(lista.data);
        };

        fetchData();
    }, []);


    const listaFiltrada = listaEstado.filter((valor) => valor.nome.toLowerCase().includes(busca.toLowerCase()))

    return (

        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2 " type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome estado" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                       
                        <th scope="col">Nome </th>
                        <th scope="col">Sigla</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaFiltrada.map((valor) => {
                            return (
                                <tr key={valor._id} className="">
                                <td>{valor.nome}</td>
                                <td>{valor.sigla}</td>
                            
                                <button onClick={()=>{
                                    push(`/estados/edit/${valor._id}`)
                                }} className="btn btn-success">Editar </button>

                                <button  className ="btn btn-danger" onClick={ async ()=>{
                                   const response =  await axios.delete(`http://localhost:3333/estado/${valor._id}`)
                                   if(response.data.sucesso){
                                    alert(`sucesso excluido com sucesso`)
                                    window.location.reload();
                                   }else{
                                    alert(`sucesso excluido com sucesso`)
                                   }
                                   console.log('click')
                                }}>delete</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
    
}
