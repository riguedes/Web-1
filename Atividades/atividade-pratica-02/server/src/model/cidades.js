export default class Cidades {
    constructor(nome, estadoID){
        this.nome = nome
        this.estadoID = estadoID
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()

    }
}