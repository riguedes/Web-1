'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";


async function buscarInstituicaoPorId(id) {
    const response = await axios.get(`http://localhost:3333/instituicao/${id}`)
    return response.data
}


export default function EditarInstituicao({ params }) {



    const id = params.id

    const [nome, setNome] = useState('')
    const [localizacao,setLocalizao] = useState('')
    const [causa,setCausa] = useState('')
    const [numeroVagasVoluntario, setNumeroVagasVoluntario] = useState(0)
    const [doacaoMinima, setDoacaoMinima] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            const lista = await buscarInstituicaoPorId(id);
            console.log(lista)
            setNome(lista.nome);
            setLocalizao(lista.localizacao);
            setCausa(lista.causa);
            setNumeroVagasVoluntario(lista.numeroVagasVoluntario);
            setDoacaoMinima(lista.doacaoMinima);

        };

        fetchData();
    }, [id]);



    const handleSumit = async (event) => {

        event.preventDefault();

        const data = {
            nome,
            localizacao,
            causa,
            numeroVagasVoluntario,
            doacaoMinima
        }

        try {

            const response = await axios.put(`http://localhost:3333/instituicao/${id}`, data)
            if (response.data.sucesso) {
                await Swal.fire(
                    'Good job!',
                    `${response.data.sucesso}`,
                    'success'
                )
            } else {
                alert(`${response.data.erro}`)
            }

        } catch (error) {
            alert(`${response.data.erro}`)
        }
    }
    return (
        <div className="container col-md-8 p-4 ">
            <form onSubmit={handleSumit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">nome</label>
                    <input type="text"  value={nome} name='nome' id='nome' className="form-control" required onChange={(event) => setNome(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">localização</label>
                    <input type="text"  value={localizacao} name='localizacao' id='idade' className="form-control" onChange={(event) => setLocalizao(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Causa</label>
                    <input type="text" value={causa} name='causa' id='causa' className="form-control" required onChange={(event) => setCausa(event.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Numero de vagas de Voluntario</label>
                    <input type="number"  value={numeroVagasVoluntario} name='numeroVagasVoluntario' id='numeroVagasVoluntario' className="form-control" required onChange={(event) => setNumeroVagasVoluntario(event.target.value)} />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Doação minima</label>
                    <input type="number" value={doacaoMinima} name='doacaoMinima' id='doacaoMinima' className="form-control" min={0} required onChange={(event) => setDoacaoMinima(event.target.value)} />
                </div>

                <button type="submit" className="btn btn-success"  > Confirmar Edição </button>
            </form>
        </div>
    )
}