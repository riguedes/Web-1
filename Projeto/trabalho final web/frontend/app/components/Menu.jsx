'use client'
import Link from "next/link"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href={'/'}> Home </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    
                        <li className="nav-item">
                            <Link className="nav-link" href={'/instituicao/create'}>Cadastro instituições</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href={'/instituicao/list'}>Instituição com vagas</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href={'/usuario/create'}>Cadastro usuario</Link>
                        </li>

                        
                        <li className="nav-item">
                            <Link className="nav-link" href={'/areaAdmin'}>Area adiminstrativa</Link>
                        </li>

                
                        <li className="nav-item dropdown">
                            <Link className="nav-link" href={'/instituicao/crud/list'}>Lista de instituições Cadastrada</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href={'/sobreNos'}>Sobre nos</Link>
                        </li>



                    </ul>
                </div>

            </div>
        </nav>
    )
}