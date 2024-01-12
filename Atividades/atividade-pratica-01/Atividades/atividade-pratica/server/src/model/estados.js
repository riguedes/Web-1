
export default class Estado {
    constructor(nome, sigla){
        this.nome  = nome
        this.sigla = sigla
        this.criadoEm =  new Date().toDateString()
        this.atualizadoEm = new Date().toDateString()

    }
}

