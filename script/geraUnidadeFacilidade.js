const unidadeFacilidade = (u, a) => {
    return {
        id_facilidade: a.id_facilidade,
        id_unidade: u.id_unidade,
    };
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const exportUnidadeFacilidade = (unidades, facilidades) => {
    let content = [];
    for(let i = 0; i < unidades.length; i++) {
        const u = unidades[i];
        
        for(let j=0; j<facilidades.length; j++) {
            const hasThisActivity = getRandomInt(2)==1;;
            if (hasThisActivity) {
                const uat = unidadeFacilidade(u, facilidades[j]);
                content = [...content, uat];
            }
        }
    }   
    return content;
};

const insertsSQLUnidadeFacilidade = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_unidade}, '${a.id_facilidade}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.unidade_facilidade (id_unidade, id_facilidade) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportUnidadeFacilidade
, insertsSQLUnidadeFacilidade };