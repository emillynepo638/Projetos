import { Link } from 'react-router-dom'

function CardFilme({
  filme,
  favoritos,
  toggleFavorito,
  reacoes,
  definirReacao
}) {
  const estaFavoritado = favoritos.some((item) => item.id === filme.id)
  const reacaoAtual = reacoes[filme.id]

  return (
    <div className="card-filme">
      <div className="card-imagem-wrapper">
        <img src={filme.imagem} alt={filme.titulo} className="card-imagem" />
      </div>

      <div className="card-conteudo">
        <span className="tag-tipo">{filme.tipo}</span>
        <h3>{filme.titulo}</h3>
        <p><strong>Gênero:</strong> {filme.genero}</p>
        <p><strong>Ano:</strong> {filme.ano}</p>
        <p><strong>Duração:</strong> {filme.duracao}</p>

        <div className="acoes-card">
          <button
            className={reacaoAtual === 'gostei' ? 'btn-reacao ativo' : 'btn-reacao'}
            onClick={() => definirReacao(filme.id, 'gostei')}
          >
            👍
          </button>

          <button
            className={reacaoAtual === 'naoGostei' ? 'btn-reacao ativo' : 'btn-reacao'}
            onClick={() => definirReacao(filme.id, 'naoGostei')}
          >
            👎
          </button>
        </div>

        <div className="card-botoes">
          <Link to={`/filme/${filme.id}`} className="btn-detalhes">
            Assistir
          </Link>

          <button
            className={estaFavoritado ? 'btn-favorito ativo' : 'btn-favorito'}
            onClick={() => toggleFavorito(filme)}
          >
            {estaFavoritado ? '❤️ Favoritado' : '🤍 Favoritar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardFilme