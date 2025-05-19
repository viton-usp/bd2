const { exportRandomAssinatura } = require('./geraAssinatura');

const nomes = [
    "Maria", "José", "Ana", "João", "Antônio", "Francisco", "Carlos", "Paulo", "Pedro", "Lucas", "Luiz", "Marcos", "Luis", "Gabriel", "Rafael", "Daniel", "Marcelo", "Bruno", "Eduardo", "Felipe", "Ricardo", "Fernando", "Rodrigo", "Márcio", "André", "Diego", "Alexandre", "Adriano", "Sandro", "Ivan", "Leandro", "Gustavo", "Marcel", "Thiago", "Sérgio", "Igor", "Cristiano", "Reinaldo", "César", "Mauro", "Vinícius", "Raul", "Tiago", "Renato", "Davi", "Gilberto", "Hugo", "Wilson", "Júlio", "Arthur", "Maurício", "Cláudio", "Elias", "Valdir", "Otávio", "Elton", "Gerson", "Rogério", "Dário", "Silvio", "Roberto", "Cleiton", "Barbara", "Beatriz", "Bianca", "Brenda", "Bruna", "Camila", "Carla", "Clara", "Cláudia", "Cristina", "Daniela", "Débora", "Diana", "Eliana", "Elisa", "Fabiola", "Fabiana", "Fernanda", "Flávia", "Giovana", "Glória", "Grace", "Helena", "Iara", "Ingrid", "Íris", "Isabel", "Isadora", "Ivone", "Jade", "Janaina", "Joana", "Júlia", "Karina", "Lara", "Laura", "Leila", "Leticia", "Lívia", "Luana", "Luciana", "Luiza", "Márcia", "Margarete", "Mariah", "Mariana", "Marina", "Marta", "Michele", "Miriam", "Nádia", "Natalia", "Natasha", "Nicole", "Olivia", "Patrícia", "Paula", "Priscila", "Rafaela", "Raquel", "Regina", "Renata", "Rita", "Roberta", "Rosana", "Rosangela", "Sabrina", "Samanta", "Sandra", "Sara", "Selma", "Sílvia", "Simone", "Sofia", "Solange", "Sônia", "Suzana", "Talita", "Tânia", "Tatiana", "Teresa", "Valéria", "Vanessa", "Vera", "Vitória", "Viviane", "Yasmin", "Yolanda", "Zélia", "Alice", "Aline", "Alícia", "Amanda", "Amélia", "Ana Paula", "Angelica", "Ariana", "Carolina", "Catarina", "Cecília", "Célia", "Cibele", "Cíntia", "Cleide", "Conceição", "Cristiane", "Ester", "Érika", "Estela", "Evelyn", "Fátima", "Gabriela", "Gisele", "Helena", "Heloísa", "Ivete", "Jacqueline", "Jéssica", "Juliana", "Karla", "Kátia", "Larissa", "Lilian", "Lorena", "Lu", "Madalena", "Malu", "Mara", "Marciana", "Melissa", "Mércia", "Nádia", "Naomi", "Nara", "Nina", "Norma", "Pâmela", "Raíssa", "Rosa", "Rosiane", "Salete", "Samantha", "Sheila", "Tereza", "Thais", "Ursula", "Valentina", "Vanessa", "Vilma", "Xênia", "Zara"
];

const sobrenomes = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Ribeiro", "Martins", "Carvalho", "Lopes", "Machado", "Nunes", "Moura", "Costa", "Dias", "Castro", "Campos", "Cardoso", "Silveira", "Monteiro", "Cruz", "Melo", "Araújo", "Rocha", "Correia", "Dias", "Pinto", "Carvalho", "Teixeira", "Barros", "Morais", "Fernandes", "Barbosa", "Xavier", "Faria", "Vieira", "Neto", "Ramos", "Marques", "Reis", "Moreira", "Freitas", "Borges", "Mendes", "Nascimento", "Soares", "Viana", "Farias", "Henriques", "Neves", "Pinheiro", "Coelho", "Duarte", "Sousa", "Azevedo", "Tavares", "Barreto", "Pacheco", "Cunha", "Leite", "Macedo", "Batista", "Oliveira", "Marinho", "Andrade", "Vargas", "Sampaio", "Magalhães", "Lacerda", "Siqueira", "Salazar", "Moraes", "Vasconcelos", "Brito", "Andrade", "Esteves", "Pires", "Maia", "Lobo", "Assis", "Simões", "Leal", "Queiroz", "Furtado", "Madeira", "Aragão", "Novaes", "Abreu", "Machado", "Pinho", "Teles", "Cordeiro", "Couto", "Galvão", "Bueno", "Arantes", "Figueiredo", "Pessoa", "Amaral", "Santana", "Sales", "Peixoto", "Brasil", "Braga"
];
const aluno = (id, nome, cpf) => {
    return {
        id_aluno: id,
        nome_aluno: nome,
        cpf
    };
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

Number.prototype.leadingZeros = function(n) {
    return this.toPrecision(n).split('.').reverse().join('');
};

const exportAlunos = (planos, unidades, statusAssinaturas) => {
    let content = [];
    for (let i = 1; i<= 500; i++) {
        const randomNome = getRandomInt(199);
        const randomSobrenome1 = getRandomInt(99);
        const randomSobrenome2 = getRandomInt(99);
        const randomCPF = getRandomInt(100000000000);
        const a = aluno(i, `${nomes[randomNome]} ${sobrenomes[randomSobrenome1]}, ${sobrenomes[randomSobrenome2]}`, randomCPF.leadingZeros(11));
        const assinatura = exportRandomAssinatura(i, planos, unidades, a, statusAssinaturas);
        content = [...content, {
            ...a,
            assinatura
        }];
    }

    return content;
};

const insertsSQLAluno = (list) => {
    let valuesContent = '';
    for(let i=0; i<list.length; i++) {
        const a = list[i];
        const sqlInsert = `(${a.id_aluno}, '${a.nome_aluno}', '${a.cpf}')`;
        valuesContent.concat(sqlInsert);
        valuesContent = `${valuesContent}\n${sqlInsert}`;
        if (i != list.length-1)
            valuesContent = `${valuesContent},`;
    }

    const sqlContent = `insert into ldb.public.aluno (id_aluno, nome, cpf) values ${valuesContent};`;
    return sqlContent;
}

module.exports =  { exportAlunos, insertsSQLAluno };