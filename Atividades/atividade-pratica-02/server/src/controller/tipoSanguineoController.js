import TipoSanguineos from "../model/tipoSanguineos.js";
import TipoSanguineoDao from "../database/tipoSanguineosDao.js";
import tipoSanguineosDao from "../database/tipoSanguineosDao.js";

export default class TipoSanguineoController {
  constructor() {}

  async salvarTipoSanguineo(req, res) {
    try {
      const { tipo, fator } = req.body;
      const tipoSanguineo = new TipoSanguineos(tipo, fator);
      const tipoSanguineoSalvo = await TipoSanguineoDao.create(tipoSanguineo);
      res.json({ sucesso: "tipo sanguineo salvo com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao salvar tipo sanguineo" });
    }
  }

  async buscarTodosTiposSanguineo(req, res) {
    try {
      const listaTipoSanguineo = await TipoSanguineoDao.find();
      res.json(listaTipoSanguineo);
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao listar todos os tipos sanguineos" });
    }
  }

  async buscarTipoSanguineoPorId(req, res) {
    try {
      const id = req.params.id;
      const listaTipoSanguineo = await tipoSanguineosDao.findById({ _id: id });
      res.json(listaTipoSanguineo);
    } catch (error) {
      console.log(erro);
      res.json({ erro: "erro ao listar tipo sanguineo id" });
    }
  }

  async editarTipoSanguineo(req, res) {
    try {
      const id = req.params.id;
      const { tipo, fator } = req.body;
      const tipoSanguineo = new TipoSanguineos(tipo, fator);
      const tipoSanguineoEditado = await TipoSanguineoDao.findByIdAndUpdate(
        id,
        tipoSanguineo,
        {
          new: true,
        }
      );
      res.json({ sucesso: "tipo sanguineo editado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  }

  async excluirTipoSanguineo(req, res) {
    try {
      const id = req.params.id;
      const tipoSanguineoExcluido = await tipoSanguineosDao.findOneAndDelete(
        {_id:id}
      );
      res.json({sucesso: "Tipo sanguineo excluido com sucesso"})
    } catch (error) {
      console.log(error);
      res.json({error: "erro ao excluir tipo sanguineo "})
    }
  }
}
