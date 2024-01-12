import express from "express";
import rotas from "./router.js";
import conexao from "./src/database/conexao.js"
import cors from "cors"

const app = express()
const port = 3333
app.use(cors())

app.use(express.json())
app.use(rotas)


app.listen(port, ()=>{
    console.log(`Executando com sucesso na porta${port}`)
    console.log(`http://localhost:${port}`	)
})