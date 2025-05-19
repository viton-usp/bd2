const timestampUmMes = 2592000000;
const timestampUmDia = 86400000;

const checkin = (id, aluno, id_unidade, dataCheckin) => {
    return {
        id_checkin: id,
        id_aluno: aluno.id_aluno, 
        id_unidade,
        data_criacao: dataCheckin
    };
};

const cobranca = (id, assinatura, data_criacao, data_vencimento, status_cobranca) => {
    return {
        id_cobranca: id,
        data_criacao,
        data_vencimento,
        status_cobranca,
        valor: assinatura.id_plano == 0 ? 99.9 : 119.9,
        id_assinatura: assinatura.id
    }
}

const pagamento = (id, cobranca, dataPagamento) => {
    return {
        id_pagamento: id,
        id_cobranca: cobranca.id_cobranca,
        data_pagamento: dataPagamento
    }
}

const pagamentoPix = (pagamento, cpf) => {
    return {
        id_pagamento: pagamento.id_pagamento,
        chave_pix: cpf,
    }
}

const pagamentoCartao = (pagamento, digitos) => {
    return {
        id_pagamento: pagamento.id_pagamento,
        final_cartao: digitos,
    }
}

Number.prototype.leadingZeros = function(n) {
    return this.toPrecision(n).split('.').reverse().join('');
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const exportCobrancasPagamentosCheckins = (unidades, alunos) => {
    let checkins = [];
    let currentIdCheckins = 1;

    let cobrancas = [];
    let currentIdCobranca = 1;

    let pagamentos = [];
    let currentIdPagamento = 1;

    let pagamentosPix = [];
    let pagamentosCartao = [];

    for(let i=0; i< alunos.length; i++) {
        const aluno = alunos[i];
        const assinatura = aluno.assinatura;
        
        let dataAssinaturaTimestamp = new Date(assinatura.data_criacao).getTime();
        let diaAtual = dataAssinaturaTimestamp;
        let dataVigenciaAssinaturaTimestamp = new Date(assinatura.data_vigencia).getTime();
        const timestampHoje = Date.now();
        
        while (diaAtual < timestampHoje) {
            const fezCheckin = getRandomInt(100) > 60;
            //Cria checkin
            if (fezCheckin) {
                const randomUnidade = getRandomInt(unidades.length-1);
                const id_unidade = assinatura.id_plano == 1? assinatura.id_unidade : (randomUnidade + 1);
                
                const c = checkin(currentIdCheckins, aluno, id_unidade, new Date(diaAtual));
                checkins = [...checkins, c];
                currentIdCheckins = currentIdCheckins + 1;
            } 
            
            const diferencaAtualVigencia = ((dataVigenciaAssinaturaTimestamp - diaAtual)/timestampUmDia);
            //Gera cobranca e pagamento
            if (diferencaAtualVigencia == 5) {
                const dataVencimentoTimestamp = diaAtual + (5 * timestampUmDia);
                const c = cobranca(currentIdCobranca, assinatura, new Date(diaAtual), new Date(dataVencimentoTimestamp), 1);
                cobrancas = [...cobrancas, c];
                currentIdCobranca++;
                
                
                const isPagamentoPix = getRandomInt(2);
                const dataPagamentoTimestamp = diaAtual + (getRandomInt(10) * timestampUmDia);
                const p = pagamento(currentIdPagamento, c, new Date(dataPagamentoTimestamp));
                pagamentos = [...pagamentos, p];
                if (isPagamentoPix) {
                    const ppix = pagamentoPix(p, aluno.cpf);
                    pagamentosPix = [...pagamentosPix, ppix];
                } else {
                    const finalCartao = getRandomInt(9999);
                    const pcartao = pagamentoCartao(p, finalCartao.leadingZeros(4));
                    pagamentosCartao = [...pagamentosCartao, pcartao];
                }
                currentIdPagamento++;
                dataVigenciaAssinaturaTimestamp = dataVigenciaAssinaturaTimestamp + timestampUmMes;
            }
            diaAtual = diaAtual + timestampUmDia;
        }

    }; 

    return {
        cobrancas, pagamentos, pagamentosPix, pagamentosCartao, checkins
    };
};

module.exports =  {
    exportCobrancasPagamentosCheckins
};