interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <table className="w-full text-left border border-gray-200 mt-4">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="border px-3 py-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-t">
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}