import { meses } from '../data/dados'

function Filtros({
  mesSelecionado,
  setMesSelecionado,
  categoriaSelecionada,
  setCategoriaSelecionada,
  busca,
  setBusca,
  categoriasDisponiveis,
}) {
  return (
    <section className="bloco animar-subida">
      <div className="bloco-topo">
        <h3>Filtros e busca</h3>
        <p>Encontre movimentações com mais rapidez.</p>
      </div>

      <div className="filtros-grid">
        <div className="campo">
          <label>Buscar por descrição</label>
          <input
            type="text"
            placeholder="Ex: mercado, salário..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Filtrar por mês</label>
          <select
            value={mesSelecionado}
            onChange={(e) => setMesSelecionado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            {meses.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Filtrar por categoria</label>
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="Todas">Todas</option>
            {categoriasDisponiveis.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default Filtros