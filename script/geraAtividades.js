const activities = [
    "", "Musculação", "Boxe", "Dança", "Spinning"
];

let content = [];


const atividade = (i, nome) => {
    return {
        id_atividade: i,
        nome_atividade: nome,
    };
};

const exportAtividades = () => {
    for(let i = 1; i <= 4; i++) {
        const a = atividade(i, activities[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLAtividades = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_atividade}, '${a.nome_atividade}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.atividade (id_atividade, nome_atividade) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportAtividades, insertsSQLAtividades };