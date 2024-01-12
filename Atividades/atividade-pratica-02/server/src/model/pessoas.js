export default class Pessoa {
    constructor(nome, rua, numero, complemento, rg, cidadeID,tipoSanguineoID){
        this.nome = nome
        this.rua = rua
        this.numero = numero
        this.complemento = complemento
        this.rg = rg
        this.cidadeID = cidadeID
        this.tipoSanguineoID = tipoSanguineoID
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()
    }
}