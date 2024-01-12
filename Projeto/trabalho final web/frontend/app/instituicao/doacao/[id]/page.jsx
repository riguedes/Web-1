'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useState, useEffect} from "react";
import Swal from 'sweetalert2';
import { isErrored } from "stream";


async function buscarTodosOsUsuarios() {
    const response = await axios.get(`http://localhost:3333/usuario`)
    return response.data

}

async function salvarDoacao(idInstituicao, usuarioId, data) {
    return await axios.post(`http://localhost:3333/doacao/${usuarioId}/${idInstituicao}`, data)
}

async function buscarInstituicaoPorId(id) {
    const response = await axios.get(`http://localhost:3333/instituicao/${id}`)
    return response.data
}

export default function InstituicaoDoacao({ params }) {



    const idInstituicao = params.id
    const [listaUsuario, setListaUsuario] = useState([]);
    const [usuarioId, setUsuarioId] = useState('')
    const [valor, setValor] = useState('')
    const [cpf, setCpf] = useState('')
    const [tipoPagamento, setTipoPagamento] = useState('')
    const [numeroCartao, setNumeroCartao] = useState('')
    const [codigoSeguranca, setCodigoSeguranca] = useState('')
    const [instituicao, setInstituicao] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            const lista = await buscarTodosOsUsuarios();
            const instituicao = await buscarInstituicaoPorId(idInstituicao)
            setInstituicao(instituicao)
            setListaUsuario(lista);
        };

        fetchData();
    }, []);


    const handleSubmit = async (event) => {

        event.preventDefault()

        const data = {
            valor,
            cpf,
            tipoPagamento,
            numeroCartao,
            codigoSeguranca

        }
        if(valor < instituicao.doacaoMinima ){

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${instituicao.nome} aceita doações a partir de ${instituicao.doacaoMinima}`,
              });

        }else{

        try {
            const response = await salvarDoacao(idInstituicao, usuarioId, data)

            if(response.data.sucesso){

                if (tipoPagamento === 'boleto') {
                    await Swal.fire(
                        'Good job!',
                        `O boleto será enviado para o seu email!`,
                        'success'
                    );
                } else {
                    await Swal.fire(
                        'Good job!',
                        `Pagamento recebido! \n Veja as instruções no seu email `,
                        'success'
                    );
                }
           
            }
        } catch (error) {
            alert(`deu erro`)
            console.log(isErrored)

        }
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
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">CPF</label>
                    <input type="text" name='cpf' id='' className="form-control" required onChange={(event) => setCpf(event.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Valor</label>
                    <input type="number" name='valor' className="form-control" required onChange={(event) => setValor(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Tipo do pagamento</label>
                    <select className="form-select" aria-label="Default select example" name="tipoPagamento" id="" onChange={(event) => setTipoPagamento(event.target.value)}>
                        <option selected></option>
                        <option value="boleto">Boleto</option>
                        <option value="cartao">Cartao de credito</option>
                    </select>
                </div>

                {tipoPagamento === 'cartao' && (
                    <div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Numero do cartão de credito</label>
                            <input type="number" name='numeroCartao' className="form-control" onChange={(event) => setNumeroCartao(event.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="htmlForm-label">Codigo de segurança</label>
                            <input type="number" name='codigoSeguranca' className="form-control" required onChange={(event) => setCodigoSeguranca(event.target.value)} />
                        </div>
                    </div>
                )}


                <button type="submit" className="btn btn-success" > Enviar Doação </button>
            </form>
        </div>
    )

}

