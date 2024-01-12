import express from 'express'
import UsuarioController from './src/controllers/UsuarioController.js'
import InstituicaoController from './src/controllers/InstituicaoController.js'
import DoacaoController from './src/controllers/DoacaoController.js'
import InstituicaoSelecionadaController from './src/controllers/InstituicaoSelecionadaController.js'

export const rotas =  express.Router()

const usuarioController = new UsuarioController()
const instituicaoController = new InstituicaoController()
const doacaoController = new DoacaoController()
const instituicaoSelecionadaController = new InstituicaoSelecionadaController()


// Usuario rotas
rotas.post('/usuario', usuarioController.salvarUsuario)
rotas.get('/usuario/:id',usuarioController.buscarUsuarioID)
rotas.get('/usuario', usuarioController.buscarTodosUsuarios)
rotas.put('/usuario/:id', usuarioController.editarUsuario)


// Instuicao rotas
rotas.post('/instituicao', instituicaoController.salvarInstituicao)
rotas.get('/instituicao', instituicaoController.buscarTodasInstituicao)
rotas.get('/instituicao/:id', instituicaoController.buscarInstituicaoPorId )
rotas.delete('/instituicao/:id', instituicaoController.deletarInstituicao)
rotas.put('/instituicao/:id', instituicaoController.editarInstituicao)

// Doacao rotas

rotas.post('/doacao/:idUsuario/:idInstituicao', doacaoController.salvarDaocao)
rotas.get('/doacao', doacaoController.buscarTodasDoacoes)


// Instituicao selecionada rotas

rotas.post('/selecionada/instituicao/:id', instituicaoSelecionadaController.salvarInstituicaoSelecionada)
rotas.get('/selecionada/instituicao', instituicaoSelecionadaController.buscarTodasInstituicaoSelecionada )