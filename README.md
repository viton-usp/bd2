
# Projeto BD2 - Sistema de Academia

Este repositório contém o projeto completo de banco de dados e frontend desenvolvido para a disciplina de Banco de Dados II. O sistema simula uma base de dados voltada para a gestão de academias, incluindo alunos, planos, assinaturas, check-ins, cobranças e cancelamentos.

## Objetivo

Modelar, popular e visualizar um banco de dados completo e funcional, otimizado para análises e controle acadêmico.

---

## Estrutura do Projeto

### Backend (Geração de Dados SQL)

```
/bd2-main
└── script/
    ├── gerador_insert.js
    ├── geraAlunos.js
    ├── geraPlanos.js
    ├── geraFacilidades.js
    ├── ...
    └── sql-statements.txt
```

- `gerador_insert.js`: script principal que gera ~20.000 registros em SQL.
- Scripts auxiliares simulam dados variados de entidades.
- Executar com:
```bash
npm install
node gerador_insert.js
```

---

### Frontend (Painel Administrativo Web)

Aplicação desenvolvida em React + Vite + TailwindCSS, com navegação via React Router.

#### Funcionalidades
- Dashboard com cards de estatísticas
- Listagem de alunos com mock de planos
- Componentes reutilizáveis

#### Estrutura

```
/frontend-academia
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

#### Como executar

```bash
npm install
npm run dev
```

---

## Disciplina

**Banco de Dados II**  
Professor: **Luciano Vieira de Araújo**

---

## Alunos (Turma 94)

- Marcelo de Menezes Nascimento — Nº USP 13727078  
- Gabriel Bernardini Schimidt — Nº USP 12873188  
- Fernando Webes Soares Brandão — Nº USP 13672940  
- Vitor Machado Oliveira — Nº USP 7694196  
