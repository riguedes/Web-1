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

const recuperarTiposSanquineo = async () => {
    return await axios.get(`http://localhost:3333/sanguineo`)

}

const recuperarPessoaId = async (id) => {
    return await axios.get(`http://localhost:3333/pessoa/${id}`)

}


export default function editarPessoas({params}){

    
    const id  = params.id
    const {push} = useRouter()
    const [nome, setNome] = useState('')
    const [rua, setRua] = useState([])
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [rg, setRg] = useState('')
    const [cidade, setCidade] = useState([])
    const [tipoSanquineo, setTipoSanquineo] = useState([])
    const [cidadeID, setCidadeID] = useState('')
    const [tipoSanguineoID, setTipoSanquineoID] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await recuperarListaCidade()
            const lisaTipoSanquineo = await recuperarTiposSanquineo()
            const pessoa = await recuperarPessoaId(id)
            console.log(pessoa.data)
            setCidade(lista.data);
            setTipoSanquineo(lisaTipoSanquineo.data)
            setNome(pessoa.data.nome)
            setRua(pessoa.data.rua)
            setNumero(pessoa.data.numero)
            setComplemento(pessoa.data.complemento)
            setRg(pessoa.data.rg)
            setCidadeID(pessoa.data.cidadeID._id)
            setTipoSanquineoID(pessoa.data.tipoSanguineoID._id)
        };

        fetchData();
    }, [id]);

    const editarDadosPessoa = async (event) => {
        event.preventDefault()
    
        const data = {
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidadeID,
            tipoSanguineoID
        }
    
        try{
            const response = await axios.put(`http://localhost:3333/pessoa/${id}`, data)
            alert(`${response.data.sucesso}`)
            push('/pessoas/list')
        }catch(error){
            console.log(error)
        }
        
    }

  


    return (
        <div className="container col-md-9 p-5">
        <h1>edição da pessoa: {nome} </h1>
    
        <form onSubmit={editarDadosPessoa} >
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="htmlForm-label">Nome</label>
                <input type="text"value={nome} className="form-control"  placeholder='Informe o seu nome' onChange={(event) => { setNome(event.target.value) }} required />
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

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="htmlForm-label">RG</label>
                <input type="text"value={rg} className="form-control"  placeholder='Informe o rg' onChange={(event) => { setRg(event.target.value) }} required />
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

            <div className='mb-3'>
                <label htmlFor="estado">Tipo Sanguineo</label>
                    <select className="form-select" aria-label="Default select example" name="tipoSanguineoID" value={tipoSanguineoID} onChange={(event) => setTipoSanquineoID(event.target.value)}>
                        <option value="" selected disabled> Selecione</option>
                            {
                                tipoSanquineo.map((valor) => {
                                    return (
                                        <option key={valor._id} value={valor._id}> {valor.tipo}  {valor.fator}</option>
                                    )
                                })
                            }
                        </select>
            </div>
    
    
            <button type="submit" className="btn btn-primary">Editar Pessoa</button>
        </form>
       </div>
    )
}