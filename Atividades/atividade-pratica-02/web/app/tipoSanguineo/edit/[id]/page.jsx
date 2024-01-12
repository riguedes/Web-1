"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

async function recuperarTipoSanguineoID(id) {
    return await axios.get(`http://localhost:3333/sanguineo/${id}`)
}
export default function editarTipoSanguineo({ params }) {

    const { push } = useRouter()
    const id = params.id

    const [tipoSanguineo, setTipoSanguineo] = useState({})
    const [tipo, setTipo] = useState('')
    const [fator, setFator] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const tipoSanguineo = await recuperarTipoSanguineoID(id)
            setTipoSanguineo(tipoSanguineo.data);
            setTipo(tipoSanguineo.data.tipo)
            setFator(tipoSanguineo.data.fator)

        };

        fetchData();
    }, [id]);

    const editarDadosTipoSanguineo = async (event) => {

        event.preventDefault()

        const data = {
            tipo,
            fator
        }



        try {
            const response = await axios.put(`http://localhost:3333/sanguineo/${id}`, data)
            alert(`${response.data.sucesso}`)
            push('/tipoSanguineo/list')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="container col-md-9 p-5">
            <h1>Editar cadastro do Tipo Sanguineo: {tipo} - {fator}</h1>


            <form onSubmit={editarDadosTipoSanguineo} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Tipo</label>
                    <input type="text" value={tipo} className="form-control" placeholder='Informe o tipo sanguineo' onChange={(event) => { setTipo(event.target.value) }} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Fator</label>
                    <input type="text" value={fator} className="form-control" placeholder='Informe o fator ' onChange={(event) => { setFator(event.target.value) }} required />
                </div>

                <button type="submit" className="btn btn-primary">Editar tipo sanguineo</button>
            </form>
        </div>

    )

}