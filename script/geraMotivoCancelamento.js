const motivos = [
    "", "Upgrade Para Plano Rede", "Downgrade para Plano Unidade", "Troca de Academia - Variedade",
    "Troca de Academia - Valor dos Planos", "Não estou usando", "Outro"
];

const motivoCancelamento = (i, nome) => {
    return {
        id_motivo_cancelamento: i,
        nome_motivo_cancelamento: nome,
    };
};

const exportMotivoCancelamento = () => {
    let content = [];
    for(let i = 1; i <= 6; i++) {
        const a = motivoCancelamento(i, motivos[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLMotivoCancelamento = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_motivo_cancelamento}, '${a.nome_motivo_cancelamento}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.motivo_cancelamento (id_motivo_cancelamento, descricao_motivo_cancelamento) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  {exportMotivoCancelamento, insertsSQLMotivoCancelamento};