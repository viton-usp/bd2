const satuses = [
    "", "UNIDADE", "REDE"
];

let content = [];


const plano = (i, nome) => {
    return {
        id_plano: i,
        nome_plano: nome,
    };
};

const exportPlanos = () => {
    for(let i = 1; i <= 2; i++) {
        const a = plano(i, satuses[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLPlanos = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_plano}, '${a.nome_plano}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.plano (id_plano, nome_plano) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  {exportPlanos, insertsSQLPlanos};