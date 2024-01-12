import CidadeDao from "../database/cidadeDao.js";
import Cidade from "../model/cidades.js";

export default class CidadeController {
  constructor() {}

  async salvarCidade(req, res) {
    try {
      const { nome, estadoID } = req.body;

      const cidade = new Cidade(nome, estadoID);

      const cidadeSalva = await CidadeDao.create(cidade);

      res.json({ sucesso: "sucesso ao salvar cidade" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao salvar cidade" });
    }
  }

  async buscarTodasAsCidades(req, res) {
    try {
      const listaCidades = await CidadeDao.find().populate("estadoID");
      res.json(listaCidades);
    } catch (error) {
      console.log(error);
      res.json({ erro: "Erro ao listarTodas as cidades" });
    }
  }

  async buscarCidadePorID(req, res) {
    try {
      const id = req.params.id;
      const cidadeId = await CidadeDao.findById({ _id: id }).populate(
        "estadoID"
      );
      res.json(cidadeId);
    } catch (error) {
      console.log(error);
      res.json({ erro: "Erro ao listar as cidades por id" });
    }
  }

  async editarCidade(req, res) {
    try {
      const id = req.params.id;
      const { nome, estadoID } = req.body;

      const cidade = new Cidade(nome, estadoID);
      const cidadeEditada = await CidadeDao.findByIdAndUpdate(id, cidade, {
        new: true,
      });

      res.json({ sucesso: "sucesso ao editar cidade" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao editar cidade" });
    }
  }

  async excluirCidade(req, res) {
    try {
      const id = req.params.id;
      
      const cidadeExcluida = await CidadeDao.findOneAndDelete(
        {_id:id}
      );

      res.json({ sucesso: "cidade excluida com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao excluir cidade por id" });
    }
  }
}
