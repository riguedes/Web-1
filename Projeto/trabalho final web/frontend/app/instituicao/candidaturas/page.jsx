
'use client'


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


import axios from 'axios'

const buscarTodasAsCandidaturas = async () => {

    try {

        const response = await axios.get(`http://localhost:3333/selecionada/instituicao`)

        return  response.data

    } catch (error) {
        console.log(error)

    }

}

export default function ListaDeMinhasCandidaturas(){

    const { push } = useRouter()

    const [listaCandidaturas, setListaCandidaturas] = useState([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const lista = await buscarTodasAsCandidaturas();
            console.log(lista)
            setListaCandidaturas(lista);
        };

        fetchData();
    }, []);

    const listaFiltrada = listaCandidaturas.filter((candidatura) => candidatura.instituicao.nome.toLowerCase().includes(busca.toLowerCase()))

    return (
     
        <div >
            <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2" type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome instituição" aria-label="Search" />
                    </form>
                </div>
            </nav>

            {listaFiltrada.length > 0 ? (

            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Nome Usuario</th>
                        <th scope="col">Nome instituicao</th>
                        <th scope="col">localização</th>
                        <th scope="col">Causa</th>
                        <th scope='col'>Area de Interesse</th>
                        <th scope='col'>Modalidade do serviço voluntario</th>
                        <th scope='col'>Duracao Servico </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        listaFiltrada.map((valor) => {
                            return (
                                <tr key={valor._id} className="">
                                    <td>{valor.usuarioId.nome}</td>

                                    <td>{valor.instituicao.nome}</td>
                                    <td>{valor.instituicao.localizacao}</td>
                                    <td>{valor.instituicao.causa}</td>
                                    <td>{valor.areaInterese}</td>
                                    <td>{valor.modalidadeServicoVoluntario}</td>
                                    <td>{valor.duracaoServico}</td>


                                    <button type="button" className="btn btn-success" onClick={ async () => {
                                        console.log(`clicou`)
                                         await  Swal.fire(
                                            'Good job!',
                                            `${valor.usuarioId.nome}, informações sobre as próximas etapas que serão enviadas por e-mail. `,
                                            'success'
                                        )
                                    }}>Confirmar</button>

                                   
                                </tr>
                            )

                        })
                    }

                </tbody>
            </table>
             ) : (
                <div class="alert alert-primary" role="alert">
                    <p>Nenhuma candidatura encontrada.</p>
                </div>
             )}

        </div>
        
    )
}
