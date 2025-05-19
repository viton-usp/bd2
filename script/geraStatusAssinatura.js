const satuses = [
    "", "VALIDA", "SUSPENSA", "CANCELADA"
];

const statusAssinatura = (i, nome) => {
    return {
        id_status_assinatura: i,
        nome_status_assinatura: nome,
    };
};

const exportStatusAssinatura = () => {
    let content = [];
    for(let i = 1; i <= 2; i++) {
        const a = statusAssinatura(i, satuses[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLStatusAssinatura = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_status_assinatura}, '${a.nome_status_assinatura}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.status_assinatura (id_status_assinatura, nome_status_assinatura) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  {exportStatusAssinatura, insertsSQLStatusAssinatura};