import { Router } from "express";
import CidadeController from "./src/controller/cidadeController.js";
import DoacaoController from "./src/controller/doacaoController.js";
import EstadoController from "./src/controller/estadoController.js";
import LocaisColetaController from "./src/controller/locaisColetaController.js";
import PessoasController from "./src/controller/pessoasController.js";
import TipoSanguineoController from "./src/controller/tipoSanguineoController.js";

const cidadeController = new CidadeController()
const doacaoController = new DoacaoController()
const estadoController = new EstadoController()
const locaisColetaController = new LocaisColetaController()
const pessoasController = new PessoasController()
const tipoSanguineoController = new TipoSanguineoController()

const rotas = Router()

rotas.get("/estado", estadoController.buscarTodosEstado)
rotas.get("/estado/:id",estadoController.buscarEstadoPorId)
rotas.post("/estado", estadoController.salvarEstado)
rotas.put("/estado/:id", estadoController.editarEstado)
rotas.delete("/estado/:id", estadoController.excluirEstado)

rotas.get("/cidade", cidadeController.buscarTodasAsCidades)
rotas.get("/cidade/:id", cidadeController.buscarCidadePorID)
rotas.post("/cidade", cidadeController.salvarCidade)
rotas.put("/cidade/:id",cidadeController.editarCidade)
rotas.delete("/cidade/:id", cidadeController.excluirCidade)

rotas.get("/coleta", locaisColetaController.buscarTodosLocaisDeColeta)
rotas.get("/coleta/:id",locaisColetaController.buscarLocaisDeColetaPorID)
rotas.put("/coleta/:id",locaisColetaController.editarLocalDeColeta)
rotas.post("/coleta", locaisColetaController.salvarLocalDeColeta)
rotas.delete("/coleta/:id",locaisColetaController.excluirLocalDeColeta)

rotas.get("/pessoa", pessoasController.buscarTodasAsPessoas)
rotas.get("/pessoa/:id",pessoasController.buscarPessoasPorId)
rotas.post("/pessoa", pessoasController.salvarPessoa)
rotas.put("/pessoa/:id",pessoasController.editarPessoa)
rotas.delete("/pessoa/:id",pessoasController.excluirPessoa)

rotas.get("/sanguineo",tipoSanguineoController.buscarTodosTiposSanguineo)
rotas.get("/sanguineo/:id",tipoSanguineoController.buscarTipoSanguineoPorId)
rotas.post("/sanguineo", tipoSanguineoController.salvarTipoSanguineo)
rotas.put("/sanguineo/:id",tipoSanguineoController.editarTipoSanguineo)
rotas.delete("/sanguineo/:id",tipoSanguineoController.excluirTipoSanguineo)


rotas.get("/doacao",doacaoController.buscarTodasDoacao)
rotas.get("/doacao/:id",doacaoController.buscarDoacaoPorID)
rotas.post("/doacao",doacaoController.salvarDoacao)
rotas.put("/doacao/:id",doacaoController.editarDoacao)
rotas.delete("/doacao/:id",doacaoController.excluirDoacao)







export default rotas
