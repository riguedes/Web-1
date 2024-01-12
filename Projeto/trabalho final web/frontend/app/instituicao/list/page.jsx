
'use client'


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios'

const buscarTodasInstituicao = async () => {

    try {

        return await axios.get(`http://localhost:3333/instituicao`)
    } catch (error) {
        console.log(error)

    }


}
export default function ListarInstituicao() {

    const { push } = useRouter()

    const [listaInstituicao, setListaInstituicao] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await buscarTodasInstituicao();
            console.log(lista.data)
            setListaInstituicao(lista.data);
        };

        fetchData();
    }, []);

    const listaFiltrada = listaInstituicao.filter((instituicao) => instituicao.causa.toLowerCase().includes(busca.toLowerCase()))

    return (


        <div >
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2" type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar pela causa " aria-label="Search" />
                    </form>
                </div>
            </nav>

            {listaFiltrada.length > 0 ? (

                <table className="table" >
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">localização</th>
                            <th scope="col">Causa</th>
                            <th scope="col">Numero de vagas de Voluntario</th>
                            <th scope="col">Doação Minima</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaFiltrada.map((instituicao) => {
                                return (
                                    <tr key={instituicao._id} className="">
                                        <td>{instituicao.nome}</td>
                                        <td>{instituicao.localizacao}</td>
                                        <td>{instituicao.causa}</td>
                                        <td>{instituicao.numeroVagasVoluntario}</td>
                                        <td>{instituicao.doacaoMinima}</td>

                                        <button type="button" className="btn btn-info" onClick={() => {
                                            push(`/instituicao/selecionada/${instituicao._id}`)
                                        }}> Canditadar-se à vaga</button>

                                        <button type="button" className="btn btn-warning" onClick={() => {
                                            push(`/instituicao/doacao/${instituicao._id}`)
                                        }}>Fazer doação</button>

                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>

            ) : (
                <div class="alert alert-primary" role="alert">
                    <p>Nenhuma instituição cadastrada.</p>
                </div>
            )}
        </div>
    )

}