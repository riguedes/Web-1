import Instituicao from "../model/Instituicao.js";
import InstituicaoDao from "../database/InstituicaoDao.js";

export default class InstituicaoController {
  constructor() {}

  async salvarInstituicao(req, res) {
    try {
      const { nome, localizacao, causa, numeroVagasVoluntario, doacaoMinima } = req.body;

      const instuicao = new Instituicao(nome, localizacao, causa, numeroVagasVoluntario, doacaoMinima);

      console.log(instuicao)

      const response = await InstituicaoDao.create(instuicao);
      console.log(response)

      res.json({ sucesso: `${response.nome} salvo com sucesso` });
    } catch (error) {
      res.json({ erro: `Erro ao salvar instuicao` });
    }
  }

  async buscarTodasInstituicao(req, res) {
    try {
      const listaDeInstituicao = await InstituicaoDao.find();

      res.json(listaDeInstituicao);
      
    } catch (error) {
      res.json({ erro: `Erro ao buscar todas as instuicao do banco de dados` });
      console.log(error);
    }
  }

  async editarInstituicao(req, res) {
    try {
      const id = req.params.id;
      const { nome, localizacao, causa,numeroVagasVoluntario, doacaoMinima } = req.body;

      const instituicao = new Instituicao(nome, localizacao, causa, numeroVagasVoluntario, doacaoMinima);

      const response = await InstituicaoDao.findByIdAndUpdate(id, instituicao, {
        new: true,
      });

      res.json({ sucesso: `${response.nome} atualizado  com sucesso` });
    } catch (error) {
      res.json({ erro: `Erro ao atualizar instituicao` });
    }
  }

  async buscarInstituicaoPorId(req, res) {
    try {
      const id = req.params.id;
      const instituicao = await InstituicaoDao.findById({ _id: id });

      res.json(instituicao);
    } catch (error) {
      res.json({ erro: `Erro ao buscar instituicao por id` });
    }
  }
  async deletarInstituicao(req, res) {
    try {
      const id = req.params.id;

      const instituicaoExcluida = await InstituicaoDao.findByIdAndDelete({ _id: id });
      res.json({ sucesso: `${instituicaoExcluida.nome} excluido com sucesso` });
    } catch (error) {
      res.json({ erro: `Erro ao exluir a instuicao` });
    }
  }
}
