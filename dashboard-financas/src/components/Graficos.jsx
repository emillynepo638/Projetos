import {
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'

function Graficos({ dadosPizza, dadosMes }) {
  const cores = [
    '#7c3aed',
    '#9333ea',
    '#a855f7',
    '#c084fc',
    '#22c55e',
    '#f43f5e',
    '#3b82f6',
    '#f59e0b',
  ]

  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <section className="graficos-grid">
      <div className="bloco animar-subida">
        <div className="bloco-topo">
          <h3>Gastos por categoria</h3>
          <p>Visualização em gráfico de pizza das despesas filtradas.</p>
        </div>

        {dadosPizza.length === 0 ? (
          <div className="lista-vazia">
            <p>Adicione despesas para visualizar o gráfico.</p>
          </div>
        ) : (
          <div className="grafico-box">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPizza}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {dadosPizza.map((_, index) => (
                    <Cell
                      key={index}
                      fill={cores[index % cores.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatarMoeda(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bloco animar-subida">
        <div className="bloco-topo">
          <h3>Receitas x despesas por mês</h3>
          <p>Compare a movimentação financeira ao longo dos meses.</p>
        </div>

        <div className="grafico-box">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dadosMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => formatarMoeda(value)} />
              <Legend />
              <Bar dataKey="receitas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="despesas" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Graficos