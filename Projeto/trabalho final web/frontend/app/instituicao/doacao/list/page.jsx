'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


async function buscarTodasAsDoacao() {
    try {
        const response = await axios.get(`http://localhost:3333/doacao`)
        return response.data
    } catch (error) {
        console.log(error)
    }


}

export default function ListaDeDoacao() {

    const [ListaDeDoacao, setListaDeDoacao] = useState([]);
    const [busca, setBusca] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const lista = await buscarTodasAsDoacao();
            console.log(lista)
            setListaDeDoacao(lista);
        };

        fetchData();
    }, []);

    const listaFiltrada = ListaDeDoacao.filter((obj) => obj.usuario.nome.toLowerCase().includes(busca.toLowerCase()))

    console.log(listaFiltrada)

    return (
        <>

        <nav className="navbar bg-body-tertiary ">
                <div className="container-fluid">
                    <a className="navbar-brand"></a>
                    <form className="d-flex" role="search" method="get" >
                        <input className="form-control me-2" type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome instituição" aria-label="Search" />
                    </form>
                </div>
        </nav>
            

        <div className="container">

        
            {listaFiltrada.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome Usuario</th>
                            <th scope="col">Nome Instituição</th>
                            <th scope="col">Valor doado</th>
                            <th scope="col">Tipo pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaFiltrada.map((obj) => (
                            <tr key={obj._id} className="">
                                <td>{obj.usuario.nome}</td>
                                <td>{obj.instituicao.nome}</td>
                                <td>{obj.valor}</td>
                                <td>{obj.tipoPagamento}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={async () => {
                                            await Swal.fire(
                                                'Good job!',
                                                `${obj.usuario.nome} informações sobre as proximas etapas serão enviadas por email `,
                                                'success'
                                            );
                                        }}
                                    >
                                        Confirmar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (

                <div class="alert alert-primary" role="alert">
                    <p>Nenhuma doação encontrada.</p>
                </div>
            )}
        </div>
    

    </>
    )
}