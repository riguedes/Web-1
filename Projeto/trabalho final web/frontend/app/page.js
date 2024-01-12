'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";


export default function Home() {

  const {push} = useRouter()

  return (
    <div style={{ height: "100vh", backgroundColor: "#FFFFFF" }}>

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className=" text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
            <h1 className="text-black mb-5"> </h1>
             <p className="lead text-black mb-5">Ser voluntário é uma experiência incrível de doação e contribuição para a comunidade. É dedicar um pouco do seu tempo para fazer a diferença na vida das pessoas. Ao ser voluntário, você não apenas oferece ajuda, mas também recebe gratidão e alegria em troca. É uma oportunidade de se conectar com histórias, causas e pessoas, cultivando valores como empatia e solidariedade. Ser voluntário é contribuir para um mundo mais justo, onde cada pequeno gesto faz parte de algo maior. Junte-se a essa jornada de impacto positivo e descubra a satisfação de ser a mudança que o mundo precisa</p>

              <button className="btn btn-danger" onClick={()=>{
                console.log('click')
                push('/usuario/create')
              }}>
                Seja um voluntario
              </button> 
            </div>
            <div className="col-md-6 text-center align-items-center d-flex justify-content-center">
              <img src="/img/voluntario.png" alt="" className="img-fluid w-20"  />
            </div>
          </div>
          
        </div>
        
      </section>
    </main>
    </div>
  )
}
