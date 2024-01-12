export default class TipoSanguineos {
    constructor(tipo, fator){
        this.tipo = tipo
        this.fator = fator
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()
    }
}