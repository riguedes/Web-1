import EstadoDao from "../database/estadoDao.js";
import Estado from "../model/estados.js";

export default class EstadoController {
  constructor() {}

  async salvarEstado(req, res) {
    try {
      const { nome, sigla } = req.body;

      const estado = new Estado(nome, sigla);

      const estadoSalvo = await EstadoDao.create(estado);

      res.json({ sucesso: "estado salvo com sucesso" });
    } catch (error) {
      res.json({ erro: "erro ao realizar cadastro do estado" });
      console.log(error);
    }
  }

  async buscarTodosEstado(req, res) {
    try {
      const listaEstado = await EstadoDao.find();
      res.json(listaEstado);
    } catch (error) {
      res.json({ erro: "erro ao listar todos os estados" });
      console.log(error);
    }
  }

  async editarEstado(req, res) {
    try {
      const id = req.params.id;
      const { nome, sigla } = req.body;

      const estado = new Estado(nome, sigla);
      const estadoAtualizado = await EstadoDao.findByIdAndUpdate(id, estado, {
        new: true,
      });

      res.json({ sucesso: "estado atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      res.json({ error: "erro ao atualizar estado" });
    }
  }

  async excluirEstado(req, res) {
    try {
      const id = req.params.id;
    const estadoExcluido = await EstadoDao.findOneAndDelete(
      {_id:id}
    )
    res.json({sucesso: "estado excluido com suceso"})
    } catch (error) {
      console.log(error)
      res.json({erro: "erro ao excluir estado"})
    }
    
  }

  async buscarEstadoPorId(req, res) {
    try {
      const id = req.params.id;
      const estado = await EstadoDao.findById({ _id: id });
      res.json(estado);
    } catch (error) {
      console.log(error);
      res.json({ erro: "Erro ao listar estado por ID" });
    }
  }
}
