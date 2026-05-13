import { Link, useLocation } from 'react-router-dom'

function Cabecalho({ alternarTema, tema, busca, setBusca }) {
  const location = useLocation()

  const irParaTopo = () => {
    if (location.pathname === '/') {
      const topo = document.getElementById('banner')
      topo?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const irParaFilmes = () => {
    if (location.pathname === '/') {
      const secao = document.getElementById('filmes')
      secao?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const irParaSeries = () => {
    if (location.pathname === '/') {
      const secao = document.getElementById('series')
      secao?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="cabecalho">
      <div className="logo">Emy’s Movie</div>

      <nav className="menu">
        {location.pathname === '/' ? (
          <>
            <button onClick={irParaTopo}>Início</button>
            <button onClick={irParaFilmes}>Filmes</button>
            <button onClick={irParaSeries}>Séries</button>
            <Link to="/favoritos">Favoritos</Link>
          </>
        ) : (
          <>
            <Link to="/">Início</Link>
            <Link to="/">Filmes</Link>
            <Link to="/">Séries</Link>
            <Link to="/favoritos">Favoritos</Link>
          </>
        )}
      </nav>

      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Pesquisar título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <button className="btn-tema" onClick={alternarTema}>
          {tema === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Cabecalho