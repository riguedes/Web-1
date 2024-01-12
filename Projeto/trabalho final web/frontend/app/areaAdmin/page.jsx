'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";



export default function AreaAdmin() {

    const { push } = useRouter()

    return (
        <div style={{ height: "100vh", backgroundColor: "#FFFFFF" }}>

            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <section className=" text-white py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1 className="text-black mb-5"> </h1>
                                <p className="lead text-black mb-5">Oferecemos um sistema de voluntariado fácil de usar, conectando pessoas que desejam doar seu tempo e habilidades a projetos que necessitam de apoio. Nosso sistema permite que organizações publiquem oportunidades de voluntariado, descrevendo suas necessidades específicas, e que voluntários encontrem oportunidades alinhadas com seus interesses e habilidades </p>

                                <div className="mb-3">
                                    <button className="btn btn-warning me-2" onClick={() => { console.log('click'); push('/instituicao/candidaturas') }}>
                                        Lista de candidaturas
                                    </button>

                                    <button className="btn btn-success" onClick={() => { console.log('click'); push('/instituicao/doacao/list') }}>
                                        Lista de doações
                                    </button>
                                </div>


                            </div>

                            <div className="col-md-6 text-center align-items-center d-flex justify-content-center">
                                <img src="/img/voluntarios2.png" alt="" className="img-fluid w-20" />
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </div>
    )

}