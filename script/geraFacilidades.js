const facilidades = [
    "", "Estacionamento", "Vallet", "Secador de Cabelo", "Sauna", "Cadeira de Massagem"
];

let content = [];


const facilidade = (i, nome) => {
    return {
        id_facilidade: i,
        nome_facilidade: nome,
    };
};

const exportfacilidades = () => {
    for(let i = 1; i <= 5; i++) {
        const a = facilidade(i, facilidades[i]);
        content = [...content, a];
    }   
    return content;
};

const insertsSQLFacilidades = (facilidades) => {
    let valuesContent = '';
    for(let i=0; i<facilidades.length; i++) {
        const f = facilidades[i];
        const sqlInsert = `(${f.id_facilidade}, '${f.nome_facilidade}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != facilidades.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.facilidade (id_facilidade, nome_facilidade) VALUES ${valuesContent};`;
    return sqlContent;
}

module.exports =  {exportfacilidades, insertsSQLFacilidades};