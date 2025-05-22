import Card from '../components/Card'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total de Alunos" value={1200} />
      <Card title="Assinaturas Ativas" value={980} />
      <Card title="Check-ins Hoje" value={134} />
    </div>
  )
}