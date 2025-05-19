
const formatSQLDate = (date) => {
    const sqlDate = `'${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)}-${new Date(date).getDate()}'`;
    return sqlDate;
}

const insertsSQLPagamentos = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_pagamento}, ${formatSQLDate(a.data_pagamento)}, ${a.id_cobranca})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.pagamento (id_pagamento, data_pagamento, id_cobranca) values ${valuesContent};`;
    return sqlContent;
}

const insertsSQLPix = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_pagamento}, ${a.chave_pix})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.pagamento_pix (id_pagamento, chave_pix) values ${valuesContent};`;
    return sqlContent;
}

const insertsSQLCartaoCredito = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_pagamento}, ${a.final_cartao})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.pagamento_cartao_credito (id_pagamento, final_cartao) values ${valuesContent};`;
    return sqlContent;
}


module.exports =  { insertsSQLPagamentos, insertsSQLPix, insertsSQLCartaoCredito};