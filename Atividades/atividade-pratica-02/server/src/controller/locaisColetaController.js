import localColetaDao from "../database/localColetaDao.js";
import LocalColeta from "../model/locaisColeta.js";
export default class LocaisColetaController {
  constructor() {}

  async salvarLocalDeColeta(req, res) {
    try {
      const { nome, rua, numero, complemento, cidadeID } = req.body;

      const localDeColeta = new LocalColeta(
        nome,
        rua,
        numero,
        complemento,
        cidadeID
      );
      const localDeColetaSalvo = await localColetaDao.create(localDeColeta);
      res.json({ sucesso: "local de coleta salvo com sucesso" });
    } catch (error) {
      console.log(error);
      console.log({ erro: "erro ao salvar local de coleta" });
    }
  }

  async buscarTodosLocaisDeColeta(req, res) {
    try {
      const listaDeLocaisDeColeta = await localColetaDao
        .find()
        .populate("cidadeID");
      res.json(listaDeLocaisDeColeta);
    } catch (error) {
      console.log(error);
      res.json({ error: "erro ao listar todos locais de coleta" });
    }
  }

  async buscarLocaisDeColetaPorID(req, res) {
    try {
      const id = req.params.id;
      const listaDeLocaisDeColeta = await localColetaDao
        .findById({ _id: id })
        .populate("cidadeID");
      res.json(listaDeLocaisDeColeta);
    } catch (error) {
      console.log(error);
      res.json({ error: "erro ao listar  locais de coleta por ID" });
    }
  }

  async editarLocalDeColeta(req, res) {
    try {
      const id = req.params.id;
      const { nome, rua, numero, complemento, cidadeID } = req.body;

      const localDeColeta = new LocalColeta(
        nome,
        rua,
        numero,
        complemento,
        cidadeID
      );
      const localDeColetaSalvo = await localColetaDao.findByIdAndUpdate(
        id,
        localDeColeta,
        {
          new: true,
        }
      );
      res.json({ sucesso: "local de coleta editado com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao editar local de coleta" });
    }
  }

  async excluirLocalDeColeta(req, res) {
    try {
      const id = req.params.id;
      const localDeColetaExcluido = await localColetaDao.findOneAndDelete(
        {_id:id}
      );
      res.json({ sucesso: "local de coleta excluido com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ erro: "erro ao excluir local de coleta" });
    }
  }
}
