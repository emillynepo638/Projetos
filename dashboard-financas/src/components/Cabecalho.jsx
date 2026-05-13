function Cabecalho({ modoEscuro, setModoEscuro }) {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <div>
          <p className="cabecalho-mini">Dashboard de finanças</p>
          <h1>Violeta</h1>
          <p className="cabecalho-texto">
            Organize receitas, despesas e acompanhe sua vida financeira com mais clareza.
          </p>
        </div>

        <button
          className="botao-modo"
          onClick={() => setModoEscuro(!modoEscuro)}
        >
          {modoEscuro ? '☀️ Modo claro' : '🌙 Modo escuro'}
        </button>
      </div>
    </header>
  )
}

export default Cabecalho