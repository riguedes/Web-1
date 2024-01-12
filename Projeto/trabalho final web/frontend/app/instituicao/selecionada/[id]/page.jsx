'use client'

import { useState, useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { isErrored } from "stream";

async function salvarInstituicaoSelecionada(id, data) {
    return await axios.post(`http://localhost:3333/selecionada/instituicao/${id}`, data)
}

async function buscarTodosOsUsuarios(){
    const response = await axios.get(`http://localhost:3333/usuario`)
    return response.data

}

export default function InstituicaoSelecionada({ params }) {

    const [areaInterese, setAreaInterese] = useState('')
    const [modalidadeServicoVoluntario, setModalidadeServicoVoluntario] = useState('')
    const [duracaoServico, setDuracaoServico] = useState('')
    const [usuarioId, setUsuarioId] = useState('')
    const [listaUsuario, setListaUsuario] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const lista = await  buscarTodosOsUsuarios();
            setListaUsuario(lista);
        };

        fetchData();
    }, []);


    const id = params.id

    const handleSubmit = async (event) => {

        event.preventDefault()

        const data = {
            areaInterese,
            modalidadeServicoVoluntario,
            duracaoServico,
            usuarioId

        }
        try {
            const response = await salvarInstituicaoSelecionada(id, data)

            const instituicaoSelecionada = await response.data
            await Swal.fire(
                'Good job!',
                `${instituicaoSelecionada.sucesso} `,
                'success'
            )
        } catch (error) {
            alert(`deu erro`)
            console.log(isErrored)

        }


    }

    return (
        <div className="container col-md-8 p-4 ">
            <form onSubmit={handleSubmit} >

            <div className="mb-3">
                  <label htmlFor="usuario">Informe seu usuario</label>
                    <select className="form-select" aria-label="Default select example" name="usuarioId" value={usuarioId} onChange={(event) => setUsuarioId(event.target.value)}>
                        <option value="" selected disabled> Selecione</option>
                        {
                            listaUsuario.map((usuario) => {
                                return (
                                    <option key={usuario._id} value={usuario._id}> {usuario.nome} - {usuario.cpf} </option>
                                )
                            })
                        }
                    </select>
            </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Area de Interesse</label>
                    <input type="text" name='areaInterese' id='areaInterese' className="form-control" required onChange={(event) => setAreaInterese(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Modalidade do serviço voluntario</label>
                    <input type="text" name='modalidadeServicoVoluntario' id='modalidadeServicoVoluntario' className="form-control" onChange={(event) => setModalidadeServicoVoluntario(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Duração do serviço</label>
                    <input type="text" name='duracaoServico' id='duracaoServico' className="form-control" required onChange={(event) => setDuracaoServico(event.target.value)} />
                </div>

                <button type="submit" className="btn btn-success"  > Confirmar </button>
            </form>
        </div>
    )


}
