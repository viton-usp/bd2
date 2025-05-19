const timestampUmMes = 2592000000;
const timestampUmDia = 86400000;

const assinatura = (id, aluno, plano, statusAssinatura, unidade, dataVigencia, dataCriacao) => {
    return {
        id,
        id_aluno: aluno.id_aluno, 
        id_plano: plano.id_plano,
        id_status_assinatura: statusAssinatura.id_status_assinatura,
        id_unidade: unidade.id_unidade,
        data_vigencia: dataVigencia,
        data_criacao: dataCriacao
    };
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const formatSQLDate = (date) => {
    const sqlDate = `'${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)}-${new Date(date).getDate()}'`;
    return sqlDate;
}

const exportRandomAssinatura = (id, planos, unidades, aluno, statusAssinaturas) => {
    const randomDias = getRandomInt(750);
    const timestampAgora = Date.now();
    const timestampCriacao = timestampAgora - (randomDias * timestampUmDia);
    const timestampVigencia = timestampCriacao + timestampUmMes;
    const dataCriacao = new Date(timestampCriacao);
    const dataVigencia = new Date(timestampVigencia);
    
    const randomUnidade = getRandomInt(unidades.length-1);
    const randomPlano = getRandomInt(100) > 70 ? 1 : 0;
    const a = assinatura(id, aluno, planos[randomPlano], statusAssinaturas[0], unidades[randomUnidade], dataVigencia, dataCriacao);
    return a;
};

const insertsSQLAssinatura = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id}, ${a.id_unidade}, ${a.id_aluno}, ${a.id_plano}, ${a.id_status_assinatura}, ${formatSQLDate(a.data_criacao)}, ${formatSQLDate(a.data_vigencia)})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.assinatura (id_assinatura, id_unidade, id_aluno, id_plano, id_status_assinatura, data_criacao, data_vigencia) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportRandomAssinatura, insertsSQLAssinatura };