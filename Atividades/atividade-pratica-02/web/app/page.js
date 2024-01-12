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
            <h1 className="text-black mb-5"> Uma pequena ação pode ter um impacto imenso.</h1>
             <p className="lead text-black mb-5"> Ao doar sangue, você não apenas oferece vida a quem precisa, mas também inspira esperança e solidariedade. Sua generosidade é a chave para transformar vidas. Juntos, podemos construir uma corrente de compaixão que faz toda a diferença. Doe sangue, doe amor, doe vida </p>

              <button className="btn btn-danger" onClick={()=>{
                console.log('click')
                push('/pessoas/create')
              }}>
                Doe vida
              </button> 
            </div>
            <div className="col-md-6 text-center align-items-center d-flex justify-content-center">
              <img src="/img/doação-sangue.png" alt="doe vida" className="img-fluid w-20"  />
            </div>
          </div>
          
        </div>
        
      </section>
    </main>
    </div>
  )
}
