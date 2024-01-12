'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import {useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";


export default function CadastroInstituicao(){
    const [nome, setNome] = useState('')
    const [localizacao,setLocalizao] = useState('')
    const [causa,setCausa] = useState('')
    const [numeroVagasVoluntario, setNumeroVagasVoluntario] = useState(0)
    const [doacaoMinima, setDoacaoMinima] = useState(0)

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

            const response = await axios.post(`http://localhost:3333/instituicao`, data)
            const instituicao = await response.data
            await Swal.fire(
                'Good job!',
                `${nome} salvo com sucesso`,
                'success'
            )

        } catch (error) {
            alert(`${instituicao.erro}`)
        }
    }



    return (
        <>
       <div className="container col-md-8 p-4 ">
            <form onSubmit={handleSumit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">nome</label>
                    <input type="text" name='nome' id='nome' className="form-control" required onChange={(event) => setNome(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">localização</label>
                    <input type="text" name='localizacao' id='idade' className="form-control"  onChange={(event) => setLocalizao(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Causa</label>
                    <input type="text" name='causa' id='causa' className="form-control" required onChange={(event) => setCausa(event.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Numero de vagas de Voluntario</label>
                    <input type="number" name='numeroVagasVoluntario' id='numeroVagasVoluntario' className="form-control" required onChange={(event) => setNumeroVagasVoluntario(event.target.value)} />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Doação minima</label>
                    <input type="number" name='doacaoMinima' id='doacaoMinima' className="form-control" min={0} required onChange={(event) => setDoacaoMinima(event.target.value)} />
                </div>

                <button type="submit" className="btn btn-success"  > Confirmar </button>
            </form>
        </div>
        </>
    )
}