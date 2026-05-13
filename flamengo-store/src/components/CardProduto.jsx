import { Link } from 'react-router-dom'

function CardProduto({ produto }) {
  return (
    <article className="card-produto">
      <div className="card-imagem-area">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="card-imagem"
        />

        <div className="card-overlay">
          <Link to={`/produto/${produto.id}`} className="botao-overlay">
            Ver detalhes
          </Link>
        </div>
      </div>

      <div className="card-info">
        <h3>{produto.nome}</h3>
        <p className="card-categoria">
          {produto.categoria} • {produto.tipo}
        </p>
        <p className="card-preco">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>
        <p className="card-parcelamento">{produto.parcelamento}</p>
      </div>
    </article>
  )
}

export default CardProduto
