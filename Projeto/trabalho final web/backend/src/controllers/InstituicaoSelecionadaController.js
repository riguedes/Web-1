import InsituicaoSelecionada from "../model/InstituicaoSelecionada.js";
import InstituicaoSlecionadaDao from "../database/InstituicaoSelecionadaDao.js";

export default class InstituicaoSelecionadaController {
  constructor() {}

  async salvarInstituicaoSelecionada(req, res) {
    try {
      const idInstituicao = req.params.id;

      const { areaInterese, modalidadeServicoVoluntario, duracaoServico, usuarioId} =
        req.body;

      const instituicao = new InsituicaoSelecionada(
        idInstituicao,
        areaInterese,
        modalidadeServicoVoluntario,
        duracaoServico,
        usuarioId
      );

      console.log(instituicao)

      const instituicaoSelecionadaSalva = await InstituicaoSlecionadaDao.create(
        instituicao
      );
      console.log(instituicaoSelecionadaSalva)

      res.json({ sucesso: `Salvo com sucesso` });
    } catch (error) {
      res.json({ erro: `Erro ao salvar instituicao selecionada` });
      console.log(error);
    }
  }

  async buscarTodasInstituicaoSelecionada(req, res) {
    try {
      
      const listaInstituicoesSelecionada = await InstituicaoSlecionadaDao.find().populate("instituicao").populate("usuarioId");

      res.json(listaInstituicoesSelecionada);

    } catch (error) {
        res.json(`Erro ao lista todas as instituicoes selecionadas `)
        console.log(error)
    }
  }
}
