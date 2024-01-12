import Doacao from "../model/Doacao.js";
import DoacaoDao from "../database/DoacaoDao.js";

export default class DoacaoController {
  constructor() {}

  async salvarDaocao(req, res) {
    try {
      const idUsuario = req.params.idUsuario;
      const idInstituicao = req.params.idInstituicao;

      const {  cpf, valor, tipoPagamento, numeroCartao, codigoSeguranca } =
        req.body;

        console.log(req.body)

      const doacao = new Doacao(
        idUsuario,
        idInstituicao,
        cpf,
        valor,
        tipoPagamento,
        numeroCartao,
        codigoSeguranca
      );

      console.log(doacao);
      const doacaoSalva = await DoacaoDao.create(doacao);
      console.log(doacaoSalva);

      res.json({ sucesso: `Doação salva com sucesso` });
    } catch (error) {
      res.json({ error: `Doação nao finalizada` });
      console.log(error);
    }
  }

  async buscarTodasDoacoes(req, res) {
    try {
      const listaDeDoacoes = await DoacaoDao.find()
        .populate("usuario")
        .populate("instituicao");

        console.log(listaDeDoacoes)

      res.json(listaDeDoacoes);
    } catch (error) {
      res.json(`Erro ao listar todas as doacoes`);
      console.log(error);
    }
  }
}
