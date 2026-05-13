import { profissionais } from '../data/servicos'

function Filtros({
  filtroProfissional,
  setFiltroProfissional,
  filtroData,
  setFiltroData,
  buscaNome,
  setBuscaNome,
  limparFiltros
}) {
  return (
    <section className="card">
      <div className="card-top">
        <h2>Filtros de busca</h2>
        <p>Refine os resultados por profissional, data ou nome do cliente.</p>
      </div>

      <div className="filters-grid">
        <div className="field">
          <label>Buscar por cliente</label>
          <input
            type="text"
            placeholder="Digite o nome do cliente"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Filtrar por profissional</label>
          <select
            value={filtroProfissional}
            onChange={(e) => setFiltroProfissional(e.target.value)}
          >
            <option value="">Todos</option>
            {profissionais.map((profissional) => (
              <option key={profissional} value={profissional}>
                {profissional}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Filtrar por data</label>
          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </div>
      </div>

      <button className="secondary-btn" onClick={limparFiltros}>
        Limpar filtros
      </button>
    </section>
  )
}

export default Filtros