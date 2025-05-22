import Table from '../components/Table'
import { getStudents } from '../services/api'
import { useEffect, useState } from 'react'

export default function Students() {
  const [data, setData] = useState<string[][]>([])

  useEffect(() => {
    setData(getStudents())
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Lista de Alunos</h1>
      <Table headers={['ID', 'Nome', 'Plano']} rows={data} />
    </div>
  )
}