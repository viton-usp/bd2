
const formatSQLDate = (date) => {
    const sqlDate = `'${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)}-${new Date(date).getDate()}'`;
    return sqlDate;
}

const cobranca = (id, assinatura, data_criacao, data_vencimento, status_cobranca) => {
    return {
        id_cobranca: id,
        id_assinatura: assinatura.id,
        data_criacao,
        data_vencimento,
        valor: assinatura.id_plano == 0 ? 99.9 : 119.9,
        status_cobranca,
    }
}

const insertsSQLCobrancas = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_cobranca}, ${a.id_assinatura}, ${formatSQLDate(a.data_criacao)}, ${formatSQLDate(a.data_vencimento)}, ${a.valor}, ${a.status_cobranca})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.cobranca (id_cobranca, id_assinatura, data_criacao, data_vencimento, valor, id_status_cobranca) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { insertsSQLCobrancas };