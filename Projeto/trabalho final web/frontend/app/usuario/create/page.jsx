'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import {useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";



export default  function CadastroUsuario() {

    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState(0)
    const [sexo, setSexo] = useState('')
    const [cpf, setCpf] = useState('')
    const [email,setEmail ] = useState('')
    const [telefone,setTelefone ] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')



    const handleSumit = async (event) => {

        event.preventDefault();

        const data = {
            nome,
            idade,
            sexo,
            cpf,
            email,
            telefone,
            cidade,
            estado
        }
        try {

            const response = await axios.post(`http://localhost:3333/usuario`, data)
            const usuario = await response.data
            await Swal.fire(
                'Good job!',
                `${usuario.sucesso}`,
                'success'
            )

        } catch (error) {
            alert(`Erro na inclusão ${nome}`)
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
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">idade</label>
                    <input type="number" name='idade' id='idade' className="form-control" min={0} max={100} required onChange={(event) => setIdade(event.target.value)} />
                </div>

                <div className="mb-3">
                <select name='sexo' id="sexo" className="form-select" aria-label="Default select example" onChange={(event) => setSexo(event.target.value)}>
                    <option selected>Sexo</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outros">Outros</option>
                </select>
                </div>
               
                <div className="mb-3 htmlForm-check">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Cpf</label>
                    <input type="text" name='cpf' id='cpf' className="form-control" required onChange={(event) => setCpf(event.target.value)} />

                </div>
                <div className="mb-3 htmlForm-check">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email</label>
                    <input type="text" name='email' id='email' className="form-control" required onChange={(event) => setEmail(event.target.value)} />

                </div>
                <div className="mb-3 htmlForm-check">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Telefone</label>
                    <input type="text" name='telefone' id='telefone' className="form-control" required  onChange={(event) => setTelefone(event.target.value)}/>

                </div>

                <div className="mb-3 htmlForm-check">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">estado </label>
                    <input type="text" name='estado' id='estado' className="form-control" required onChange={(event) => setEstado(event.target.value)}/>
                </div>

                <div className="mb-3 htmlForm-check">
                    <label htmlFor="exampleInputEmail1" className="htmlForm-label">cidade</label>
                    <input type="text" name='cidade' id='cidade' className="form-control" required onChange={(event) => setCidade(event.target.value)} />
                </div>

                <button type="submit" className="btn btn-success"  > Confirmar </button>
            </form>
        </div>
        
      </>
    )
}