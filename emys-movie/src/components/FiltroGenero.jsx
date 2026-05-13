function FiltroGenero({ generos, generoSelecionado, setGeneroSelecionado }) {
  return (
    <div className="filtro-area">
      <label htmlFor="genero">Gênero:</label>
      <select
        id="genero"
        value={generoSelecionado}
        onChange={(e) => setGeneroSelecionado(e.target.value)}
      >
        <option value="Todos">Todos</option>
        {generos.map((genero, index) => (
          <option key={index} value={genero}>
            {genero}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FiltroGenero