const formatSQLDate = (date) => {
    const sqlDate = `'${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1)}-${new Date(date).getDate()}'`;
    return sqlDate;
}

const insertsSQLCheckins = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_checkin}, ${a.id_unidade}, ${a.id_aluno}, ${formatSQLDate(a.data_criacao)})`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.checkin (id_checkin, id_unidade, id_aluno, data_checkin) values ${valuesContent};`;
    return sqlContent;
}
module.exports =  { insertsSQLCheckins };