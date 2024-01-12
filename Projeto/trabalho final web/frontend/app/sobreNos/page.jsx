'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";



export default function SobreNos() {

    const { push } = useRouter()

    return (
        <div style={{ height: "100vh", backgroundColor: "#FFFFFF" }}>

            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <section className=" text-white py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1 className="text-black mb-5"> </h1>
                                <p className="lead text-black mb-5"> Bem-vindo à nossa página dedicada ao voluntariado! Nosso propósito é criar um espaço online onde indivíduos comprometidos com causas sociais e comunitárias possam se conectar, encontrar oportunidades de voluntariado significativas e contribuir para um impacto positivo na sociedade. </p>

                            
                            </div>

                            <div className="col-md-6 text-center align-items-center d-flex justify-content-center">
                                <img src="/img/voluntarios4.png" alt="" className="img-fluid w-20" />
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </div>
    )

}