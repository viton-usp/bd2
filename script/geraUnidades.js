const cities = [
    "Rio Branco", "Maceió", "Macapá", "Manaus", "Salvador", "Fortaleza",
    "Brasília", "Vitória", "Goiânia", "São Luís", "Cuiabá", "Campo Grande",
    "Belo Horizonte", "Belém", "João Pessoa", "Curitiba", "Recife", "Teresina",
    "Rio de Janeiro", "Natal", "Porto Alegre", "Porto Velho", "Boa Vista",
    "Florianópolis", "São Paulo", "Aracaju", "Palmas"
];

const states = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
    "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
    "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const neighborhoods = [
    'Santa Cruz', 'Campo Grande', 'Bangu', 'Jacarepaguá', 'Copacabana',
    'Barra da Tijuca', 'Tijuca', 'Realengo', 'Recreio dos Bandeirantes',
    'Vila Mariana', 'Bela Vista', 'Jardim Paulista', 'Jabaquara', 'Jardim São Luís',
    'Saúde', 'Sacomã', 'Cidade Ademar', 'Sapopemba', 'Grajaú', 'Capão Redondo',
    'Jardim Ângela', 'Asa Sul', 'Ceilândia', 'Taguatinga'
];

let content = [];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

Number.prototype.leadingZeros = function(n) {
    return this.toPrecision(n).split('.').reverse().join('');
};

const unidade = (i, nome, neighborhood, city, state, numero, complemento, logradouro, cep) => {
    return {
        id_unidade: i,
        nome_unidade: nome,
        bairro: neighborhood,
        cidade: city,
        estado: state,
        numero,
        complemento,
        logradouro,
        cep,
    };
};

const exportUnidades = () => {
    let unidades = [];
    for(let i = 1; i <= 100; i++) {
        const city = cities[getRandomInt(cities.length-1)];
        const state = states[getRandomInt(states.length-1)];
        const neighborhood = neighborhoods[getRandomInt(neighborhoods.length-1)];
        const hasComplemento = getRandomInt(2)==1;
        const complemento = hasComplemento ? `'Apto ${getRandomInt(1000)}'` : null;  
        const cep = getRandomInt(100000).leadingZeros(8);
        const nome = `${city} - ${neighborhood}`;
        const logradouro = `Rua do Bairro de ${neighborhood} de ${city}`;
        const numero = getRandomInt(10000);
        const u = unidade(i, nome, neighborhood, city, state, numero, complemento, logradouro, cep);
        unidades = [...unidades, u];
    }   
    return unidades; 
};

const insertsSQLUnidades = (unidades) => {
    let valuesContent = '';
    for(let i=0; i<unidades.length; i++) {
        const u = unidades[i];
        const sqlInsert = `(${u.id_unidade}, '${u.cep}', '${u.logradouro}', '${u.numero}', ${u.complemento}, '${u.cidade}', '${u.estado}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != unidades.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.unidade (id_unidade, cep, logradouro, numero, complemento, cidade, estado) values
    ${valuesContent};`;
    return sqlContent;
}

module.exports =  {exportUnidades, insertsSQLUnidades};