export default class Doacao {
    constructor(pessoaID, localID, data){
        this.pessoaID = pessoaID
        this.localID = localID
        this.data = data
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()

    }
}