import PessoaDao from "../database/pessoaDao.js";
import Pessoa from "../model/pessoas.js";

export default class PessoasController {
  constructor() {}

  async salvarPessoa(req, res) {
    try {
      const { nome, rua, numero, complemento, rg, cidadeID, tipoSanguineoID } =
        req.body;
      const pessoa = new Pessoa(
        nome,
        rua,
        numero,
        complemento,
        rg,
        cidadeID,
        tipoSanguineoID
      );
      const pessoaSalva = await PessoaDao.create(pessoa);
      res.json({ sucesso: `${nome} salvo com sucesso` });
    } catch (error) {
      console.log(error);
      res.json({ erro: `Erro ao salvar a pessoa` });
    }
  }

  async buscarTodasAsPessoas(req, res) {
    try {
      const listaDePessoas = await PessoaDao.find()
        .populate("cidadeID")
        .populate("tipoSanguineoID");
      res.json(listaDePessoas);
    } catch (error) {
      console.log(error);
      res.json({ error: "erro ao listar todas as pessoas" });
    }
  }

  async buscarPessoasPorId(req, res) {
    try {
      const id  = req.params.id
      const listaDePessoas = await PessoaDao.findById({ _id: id })
        .populate("cidadeID")
        .populate("tipoSanguineoID");
      res.json(listaDePessoas);
    } catch (error) {
      console.log(error);
      res.json({ error: "erro ao listar pessoas por id" });
    }
  }

  async editarPessoa(req, res) {
    try {
      const id = req.params.id;
      const { nome, rua, numero, complemento, rg, cidadeID, tipoSanguineoID } =
        req.body;
      const pessoa = new Pessoa(
        nome,
        rua,
        numero,
        complemento,
        rg,
        cidadeID,
        tipoSanguineoID
      );
      const pessoaEditada = await PessoaDao.findByIdAndUpdate(id, pessoa, {
        new: true,
      });

      res.json({ sucesso: `${nome} editada com sucesso` });
    } catch (error) {
      console.log(error);

      res.json({ error: `erro ao editar pessoa ` });
    }
  }

  async excluirPessoa(req, res){
    try {
        const id = req.params.id
        const pessoaExcluida = await PessoaDao.findOneAndDelete(
          {_id:id}
        );
        res.json({sucesso: "Pessoa excluida com sucesso"})

    } catch (error) {
        res.json({erro: "Erro ao excluir pessoa"})
    }

   
  }
}
