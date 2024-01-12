import DoacaoDao from "../database/doacaoDao.js";
import Doacao from "../model/doacoes.js";

export default class DoacaoController {
  constructor() {}

  async salvarDoacao(req, res) {
    try {
      const { pessoaID, localID, data } = req.body;
      const doacao = new Doacao(pessoaID, localID, data);
      const doacaoSalva = await DoacaoDao.create(doacao);
      res.json({ sucesso: "doacao salva com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao salvar doacao" });
    }
  }

  async buscarTodasDoacao(req, res) {
    try {
      const listaDeDoacoes = await DoacaoDao.find()
        .populate("pessoaID")
        .populate("localID");
      res.json(listaDeDoacoes);
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao lista todas as doacoes" });
    }
  }

  async buscarDoacaoPorID(req, res) {
    try {
      const id = req.params.id;
      const listaDeDoacoes = await DoacaoDao.findById({ _id: id })
        .populate("pessoaID")
        .populate("localID");
      res.json(listaDeDoacoes);
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao lista todas as doacoes por id" });
    }
  }

  async editarDoacao(req, res) {
    try {
      const id = req.params.id;
      const { pessoaID, localID, data } = req.body;
      const doacao = new Doacao(pessoaID, localID, data);
      const doacaoEditada = await DoacaoDao.findByIdAndUpdate(id, doacao, {
        new: true,
      });
      res.json({ sucesso: "doacao editada com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao editar doacao" });
    }
  }
  async excluirDoacao(req, res) {
    try {
        const id = req.params.id
        const doacaoExcluida = await DoacaoDao.findOneAndDelete(
          {_id:id}
        );
        res.json({sucesso: "doacao excluida com sucesso"})
    } catch (error) {

        res.json({erro: "erro ao exlcluir doacao"})
        
    }
  }
}
