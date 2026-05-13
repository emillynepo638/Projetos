import { useEffect, useState } from 'react'
import CardProduto from '../components/CardProduto'
import { buscarProdutos } from '../services/api'

function Vitrine() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await buscarProdutos()
        setProdutos(dados)
      } catch (erro) {
        setErro('Não foi possível carregar os produtos.')
      } finally {
        setCarregando(false)
      }
    }

    carregarProdutos()
  }, [])

  return (
    <section className="pagina-vitrine container">
      <div className="titulo-secao">
        <span className="linha-vermelha"></span>
        <h2>Vitrine de produtos</h2>
      </div>

      <p className="subtitulo-pagina">
        Confira os produtos disponíveis na vitrine e escolha o seu favorito.
      </p>

      {carregando && <p className="mensagem-status">Carregando produtos...</p>}
      {erro && <p className="mensagem-status erro">{erro}</p>}

      <div className="grade-produtos">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  )
}

export default Vitrine
