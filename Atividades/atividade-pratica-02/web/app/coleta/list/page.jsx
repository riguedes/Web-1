'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

async function recuperarListaLocalDeColeta(){
    return await axios.get('http://localhost:3333/coleta')
}

export default function ListaLocalDeColeta() {

    const { push } = useRouter()

       
    const [listaLocalDeColeta, setListaLocalDeColeta] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaLocalDeColeta()
            setListaLocalDeColeta(lista.data);
        };


        fetchData();
    }, []);


    const listaFiltrada = listaLocalDeColeta.filter((valor) => valor.nome.toLowerCase().includes(busca.toLowerCase()))

    return (

        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2 " type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome do local de coleta" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                       
                        <th scope="col">nome </th>
                        <th scope="col">rua </th>
                        <th scope="col">numero </th>
                        <th scope="col">complemento </th>
                        <th scope="col">nome cidade </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        listaFiltrada.map((valor) => {
                            return (
                                <tr key={valor._id} className="">
                                <td>{valor.nome}</td>
                                <td>{valor.rua}</td>
                                <td>{valor.numero}</td>
                                <td>{valor.complemento}</td>
                                <td>{valor.cidadeID.nome}</td>

                                <button onClick={()=>{
                                    push(`/coleta/edit/${valor._id}`)
                                }} className="btn btn-success">Editar </button>

                                <button  className ="btn btn-danger" onClick={ async ()=>{
                                   const response =  await axios.delete(`http://localhost:3333/coleta/${valor._id}`)
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
