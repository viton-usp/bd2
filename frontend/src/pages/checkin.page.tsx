// checkin.page.tsx (Next.js ou React)
import { useState } from 'react';

export default function CheckinPage() {
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckin = () => {
        // Simulação dos dados de alunos (mock)
        const alunos = [
            { id: '1', nome: 'João', ativo: true },
            { id: '2', nome: 'Maria', ativo: false },
            { id: '4', nome: 'Ana', ativo: true }
        ];

        const aluno = alunos.find(a => a.id === id);

        if (!aluno) {
            setMessage('❌ Aluno não encontrado.');
        } else if (!aluno.ativo) {
            setMessage('❌ Plano inativo. Procure a recepção.');
        } else {
            const hoje = new Date().toLocaleDateString();
            // Armazena check-ins feitos (simulado)
            const checkinsFeitos = JSON.parse(localStorage.getItem('checkins') || '{}');

            if (checkinsFeitos[id] === hoje) {
                setMessage('⚠️ Você já fez check-in hoje.');
            } else {
                checkinsFeitos[id] = hoje;
                localStorage.setItem('checkins', JSON.stringify(checkinsFeitos));
                setMessage(`✅ Bem-vindo(a), ${aluno.nome}! Check-in realizado.`);
            }
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20, textAlign: 'center' }}>
            <h2>Check-in da Academia</h2>
            <input
                type="text"
                placeholder="Digite seu ID"
                value={id}
                onChange={e => setId(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: 10 }}
            />
            <button onClick={handleCheckin} style={{ padding: '10px', width: '100%' }}>
                Fazer Check-in
            </button>
            {message && <p style={{ marginTop: 20 }}>{message}</p>}
        </div>
    );
}