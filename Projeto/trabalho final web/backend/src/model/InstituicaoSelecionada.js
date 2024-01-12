export default class InstituicaoSelecionada {
    constructor(idInstituicao, areaInterese, modalidadeServicoVoluntario, duracaoServico,usuarioId){
        this.instituicao = idInstituicao
        this.areaInterese = areaInterese
        this.modalidadeServicoVoluntario = modalidadeServicoVoluntario
        this.duracaoServico = duracaoServico
        this.usuarioId = usuarioId
        this.status = 'Esperando confirmação'
    
    }
}