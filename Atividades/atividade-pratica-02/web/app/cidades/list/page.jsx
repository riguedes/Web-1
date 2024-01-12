'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

async function recuperarListaCidades(){
    return await axios.get('http://localhost:3333/cidade')
}

export default function ListaCidades() {

    const { push } = useRouter()

       
    const [ListaCidades, setListaCidades] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaCidades()
            setListaCidades(lista.data);
        };


        fetchData();
    }, []);


    const listaFiltrada = ListaCidades.filter((valor) => valor.nome.toLowerCase().includes(busca.toLowerCase()))

    return (

        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2 " type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome cidade" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                       
                        <th scope="col">nome cidade </th>
                        <th scope="col">nome estado </th>
                        <th scope="col">sigla estado </th>


                    </tr>
                </thead>
                <tbody>
                    {
                        listaFiltrada.map((valor) => {
                            return (
                                <tr key={valor._id} className="">
                                <td>{valor.nome}</td>
                                <td>{valor.estadoID.nome}</td>
                                <td>{valor.estadoID.sigla}</td>

                            
                                <button onClick={()=>{
                                    push(`/cidades/edit/${valor._id}`)
                                }} className="btn btn-success">Editar </button>

                                <button  className ="btn btn-danger" onClick={ async ()=>{
                                   const response =  await axios.delete(`http://localhost:3333/cidade/${valor._id}`)
                                   if(response.data){
                                   alert(response.data.sucesso)
                                   window.location.reload();
                                   }else{
                                    alert(response.data.erro)
                                   }
                                   
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
