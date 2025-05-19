const timestampUmMes = 2592000000;
const timestampUmDia = 86400000;

const cancelamento = (id, assinatura, motivo, data_solicitacao) => {
    return {
        id_solicitacao_cancelamento: id,
        id_assinatura: assinatura.id,
        id_motivo_cancelamento: motivo.id_motivo_cancelamento,
        data_solicitacao
    };
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const formatSQLDate = (date) => {
    const sqlDate = `'${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)}-${new Date(date).getDate()}'`;
    return sqlDate;
}

const exportRandomCancelamentos = (assinaturas, motivos) => {
    let cancelamentos = [];
    let currentId = 1;
    for(let i=0; i<assinaturas.length; i++) {
        const assinatura = assinaturas[i];
        let dataAssinaturaTimestamp = new Date(assinatura.data_criacao).getTime();
        const timestampHoje = Date.now();

        const hasCancelamento = getRandomInt(100) > 30;
        
        if (hasCancelamento) {
            const diferencaDiasAssinaturaHoje = (timestampHoje - dataAssinaturaTimestamp)/timestampUmDia;
            const randomDiffDias = getRandomInt(diferencaDiasAssinaturaHoje);
            
            if(diferencaDiasAssinaturaHoje > 60) {
                const timestampCancelamento = dataAssinaturaTimestamp + (randomDiffDias * timestampUmDia)
                const randomMotivo = getRandomInt(motivos.length);
                const c = cancelamento(currentId, assinatura, motivos[randomMotivo], new Date(timestampCancelamento));
                cancelamentos = [...cancelamentos, c];
                currentId = currentId + 1;
            }
        }
    }
    return cancelamentos;
};

const insertsSQLCancelamento = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_solicitacao_cancelamento}, ${a.id_assinatura}, ${a.id_motivo_cancelamento}, ${formatSQLDate(a.data_solicitacao)})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.solicitacao_cancelamento (id_solicitacao_cancelamento, id_assinatura, id_motivo_cancelamento, data_solicitacao) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportRandomCancelamentos, insertsSQLCancelamento };