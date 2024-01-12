export default class LocalColeta {
    constructor(nome, rua, numero, complemento, cidadeID){
        this.nome = nome
        this.rua = rua
        this.numero = numero
        this.complemento = complemento
        this.cidadeID = cidadeID
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()

    }
}