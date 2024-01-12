'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

async function recuperarListaDoacao(){
    return await axios.get('http://localhost:3333/doacao')
}

export default function ListaDoacao() {

    const { push } = useRouter()

       
    const [listaDoacao, setListaDoacao] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaDoacao()
            setListaDoacao(lista.data);
        };

        fetchData();
    }, []);


    const listaFiltrada = listaDoacao.filter((valor) => valor.pessoaID.nome.toLowerCase().includes(busca.toLowerCase()))

    return (

        <div>
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2 " type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Informe o nome da pessoa" aria-label="Search" />
                    </form>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                       
                        <th scope="col">Nome Pessoa</th>
                        <th scope="col">Local de coleta</th>
                        <th scope="col">Data marcada</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaFiltrada.map((valor) => {
                            return (
                                <tr key={valor._id} className="">
                                <td>{valor.pessoaID.nome}</td>
                                <td>{valor.localID.nome}</td>
                                <td>{valor.data}</td>

                            
                                <button onClick={()=>{
                                    push(`/doacoes/edit/${valor._id}`)
                                }} className="btn btn-success">Editar </button>

                                <button  className ="btn btn-danger" onClick={ async ()=>{
                                   const response =  await axios.delete(`http://localhost:3333/doacao/${valor._id}`)
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
