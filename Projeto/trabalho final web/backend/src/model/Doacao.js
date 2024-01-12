export default class Doacao {
    constructor(idUsuario, idInstituicao, cpf, valor, tipoPgamento, numeroCartao,  codigoSeguranca){
        this.usuario = idUsuario
        this.instituicao = idInstituicao
        this.cpf = cpf
        this.valor = valor
        this.tipoPagamento = tipoPgamento
        this.numeroCartao = numeroCartao
        this.codigoSeguranca = codigoSeguranca
        this.status = 'Esperando confirmação'


    }
}