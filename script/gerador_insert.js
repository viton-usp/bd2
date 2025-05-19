const fs = require('fs');
const { exportUnidades, insertsSQLUnidades }  = require('./geraUnidades');
const { exportAtividades, insertsSQLAtividades } = require('./geraAtividades');
const { exportfacilidades, insertsSQLFacilidades } = require('./geraFacilidades');
const { geraStatusCobrancas, insertsSQLStatusCobranca } = require('./geraStatusCobrancas');
const { exportPlanos, insertsSQLPlanos } = require('./geraPlanos');
const { exportStatusAssinatura, insertsSQLStatusAssinatura } = require('./geraStatusAssinatura');
const { exportMotivoCancelamento, insertsSQLMotivoCancelamento } = require('./geraMotivoCancelamento');
const { exportUnidadeAtividades, insertsSQLUnidadeAtividade } = require('./geraUnidadeAtividade');
const { exportUnidadeFacilidade, insertsSQLUnidadeFacilidade } = require('./geraUnidadeFacilidade');
const { exportAlunos, insertsSQLAluno } = require('./geraAlunos');
const { insertsSQLAssinatura } = require('./geraAssinatura');
const { exportCobrancasPagamentosCheckins } = require('./geraCobrancasPagamentosCheckins');
const { insertsSQLCheckins } = require('./insertSQLChehckins');
const { insertsSQLCobrancas } = require('./insertSQLCobrancas');
const { insertsSQLCartaoCredito, insertsSQLPagamentos, insertsSQLPix } = require('./insertSQLPagamentos');
const { exportRandomCancelamentos, insertsSQLCancelamento } = require('./geraSolicitacaoCancelamento');

const unidades = exportUnidades();
const atividades = exportAtividades();
const facilidades = exportfacilidades();
const statusCobranca = geraStatusCobrancas();
const planos = exportPlanos();
const statusAssinatura = exportStatusAssinatura();
const motivosCancelamento = exportMotivoCancelamento();
const unidadesAtividades = exportUnidadeAtividades(unidades, atividades);
const unidadesFacilidade = exportUnidadeFacilidade(unidades, facilidades);
const alunos = exportAlunos(planos, unidades, statusAssinatura);
let assinaturas = []

alunos.forEach(aluno => {
    assinaturas = [...assinaturas, aluno.assinatura];
});

const { cobrancas, pagamentos, pagamentosCartao, pagamentosPix, checkins} = exportCobrancasPagamentosCheckins(unidades, alunos);
const cancelamentos = exportRandomCancelamentos(assinaturas, motivosCancelamento);

let content = '';
content = `${content}${insertsSQLUnidades(unidades)}`;
content = `${content}\n\n${insertsSQLFacilidades(facilidades)}`;
content = `${content}\n\n${insertsSQLAtividades(atividades)}`;
content = `${content}\n\n${insertsSQLStatusCobranca(statusCobranca)}`;
content = `${content}\n\n${insertsSQLPlanos(planos)}`;
content = `${content}\n\n${insertsSQLStatusAssinatura(statusAssinatura)}`;
content = `${content}\n\n${insertsSQLMotivoCancelamento(motivosCancelamento)}`;
content = `${content}\n\n${insertsSQLUnidadeAtividade(unidadesAtividades)}`;
content = `${content}\n\n${insertsSQLUnidadeFacilidade(unidadesFacilidade)}`;
content = `${content}\n\n${insertsSQLAluno(alunos)}`;
content = `${content}\n\n${insertsSQLAssinatura(assinaturas)}`;
content = `${content}\n\n${insertsSQLCheckins(checkins)}`;
content = `${content}\n\n${insertsSQLCobrancas(cobrancas)}`;
content = `${content}\n\n${insertsSQLPagamentos(pagamentos)}`;
content = `${content}\n\n${insertsSQLPix(pagamentosPix)}`;
content = `${content}\n\n${insertsSQLCartaoCredito(pagamentosCartao)}`;
content = `${content}\n\n${insertsSQLCancelamento(cancelamentos)}`;

fs.writeFile('sql-statements.txt', content, (err) => {
    if (err) throw err;
    console.log('O arquivo foi criado com sucesso!');
});
