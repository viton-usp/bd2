const satuses = [
    "", "ABERTA", "PAGA"
];

let content = [];


const statusCobranca = (i, nome) => {
    return {
        id_status_cobranca: i,
        nome_status_cobranca: nome,
    };
};

const geraStatusCobrancas = () => {
    for(let i = 1; i <= 2; i++) {
        const a = statusCobranca(i, satuses[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLStatusCobranca = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_status_cobranca}, '${a.nome_status_cobranca}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.status_cobranca (id_status_cobranca, nome_status_cobranca) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  {geraStatusCobrancas, insertsSQLStatusCobranca};