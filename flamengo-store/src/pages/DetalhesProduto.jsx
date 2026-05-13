import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { buscarProdutoPorId } from '../services/api'

function DetalhesProduto() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarProduto() {
      try {
        const dados = await buscarProdutoPorId(id)
        setProduto(dados)
      } catch (erro) {
        setErro('Produto não encontrado.')
      } finally {
        setCarregando(false)
      }
    }

    carregarProduto()
  }, [id])

  if (carregando) {
    return (
      <section className="container">
        <p className="mensagem-status">Carregando detalhes do produto...</p>
      </section>
    )
  }

  if (erro) {
    return (
      <section className="container">
        <p className="mensagem-status erro">{erro}</p>
        <Link to="/vitrine" className="botao-principal">
          Voltar para vitrine
        </Link>
      </section>
    )
  }

  return (
    <section className="pagina-detalhes container">
      <div className="detalhes-grid">
        <div className="detalhes-imagem-box">
          <img src={produto.imagem} alt={produto.nome} className="detalhes-imagem" />
        </div>

        <div className="detalhes-info">
          <p className="detalhes-categoria">
            {produto.categoria} • {produto.tipo}
          </p>

          <h1>{produto.nome}</h1>

          <p className="detalhes-preco">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </p>

          <p className="detalhes-parcelamento">{produto.parcelamento}</p>

          <p className="detalhes-descricao">{produto.descricao}</p>

          <div className="detalhes-botoes">
            <Link to="/vitrine" className="botao-principal">
              Voltar para vitrine
            </Link>

            <Link to="/contato" className="botao-secundario">
              Falar sobre este produto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalhesProduto
