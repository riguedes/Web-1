'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from 'react';



const recuperarListaPessoa = async () => {
    return await axios.get(`http://localhost:3333/pessoa`)
}

const recuperarListaLocalDeColeta = async () => {
    return await axios.get(`http://localhost:3333/coleta`)
}

const recuperarDoacaoID = async (id) => {
    return await axios.get(`http://localhost:3333/doacao/${id}`)
}

export default function editarDoacao({params}) {

    const { push } = useRouter()


    const [litaPessoa, setListaPessoa] = useState([])
    const [litaLocalDeColeta, setListaLocalDeColeta] = useState([])
    const [data, setData] = useState('')
    const [pessoaID, setPessoaID] = useState('')
    const [localID, setLocalID] = useState('')
    const [doacao, setDoacao] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const l1 = await recuperarListaPessoa()
            const l2 = await recuperarListaLocalDeColeta()
            const l3 = await recuperarDoacaoID(params.id)
            setListaPessoa(l1.data)
            setListaLocalDeColeta(l2.data)
            setPessoaID(l3.data.pessoaID._id)
            setLocalID(l3.data.localID._id)
            setData(l3.data.data)
            setDoacao(l3.data)
            console.log(doacao)
        };

        fetchData();
    }, [params.id]);


    const editarDadosDoacao = async (event) => {
        event.preventDefault()

        const dados = {
            pessoaID,
            localID,
            data
        }


        try {
            const response = await axios.put(`http://localhost:3333/doacao/${params.id}`, dados)
            alert(`${response.data.sucesso}`)
            push('/doacoes/list')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="container col-md-9 p-5">
            <h1>edição de Doção  </h1>

            <form onSubmit={editarDadosDoacao} >

                <div className='mb-3'>
                    <label htmlFor="estado">Pessoa</label>
                    <select className="form-select" aria-label="Default select example" name="pessoaID" value={pessoaID} onChange={(event) => setPessoaID(event.target.value)}>
                        <option value="" selected disabled> Selecione</option>
                        {
                            litaPessoa.map((valor) => {
                                return (
                                    <option key={valor._id} value={valor._id}> {valor.nome}  {valor.rg}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='mb-3'>
                    <label htmlFor="estado">Local de coleta</label>
                    <select className="form-select" aria-label="Default select example" name="localID" value={localID} onChange={(event) => setLocalID(event.target.value)}>
                        <option value="" selected disabled> Selecione</option>
                        {
                            litaLocalDeColeta.map((valor) => {
                                return (
                                    <option key={valor._id} value={valor._id}> {valor.nome} - {valor.cidadeID.nome}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div class="col-md-3 mb-3">
                    <div class="form-group">
                        <label>Data</label>
                        <input type="time" class="form-control" value={data} name="data" autocomplete="off" onChange={(event) => setData(event.target.value)} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Editar Doação</button>

            </form>
        </div>

    )



}