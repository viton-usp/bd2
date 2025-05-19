const unidadeAtividade = (u, a) => {
    return {
        id_atividade: a.id_atividade,
        id_unidade: u.id_unidade,
    };
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const exportUnidadeAtividades = (unidades, atividades) => {
    let content = [];
    for(let i = 0; i < unidades.length; i++) {
        const u = unidades[i];
        const ua = unidadeAtividade(u, atividades[0]);
        content = [...content, ua];

        for(let j=1; j<atividades.length; j++) {
            const hasThisActivity = getRandomInt(2)==1;;
            if (hasThisActivity) {
                const uat = unidadeAtividade(u, atividades[j]);
                content = [...content, uat];
            }
        }
    }   
    return content;
};

const insertsSQLUnidadeAtividade = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_unidade}, '${a.id_atividade}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.unidade_atividade (id_unidade, id_atividade) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportUnidadeAtividades, insertsSQLUnidadeAtividade };