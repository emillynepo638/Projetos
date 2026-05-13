import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function DetalhesFilme() {
  const { id } = useParams()
  const [filme, setFilme] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/filmes/${id}`)
      .then((res) => res.json())
      .then((dados) => setFilme(dados))
      .catch((erro) => console.log('Erro ao buscar detalhes:', erro))
  }, [id])

  if (!filme) {
    return <p className="mensagem">Carregando detalhes do título...</p>
  }

  return (
    <main className="container detalhes-page">
      <div className="detalhes-card">
        <img src={filme.imagem} alt={filme.titulo} className="detalhes-imagem" />

        <div className="detalhes-info">
          <span className="tag-tipo detalhes-tag">{filme.tipo}</span>
          <h2>{filme.titulo}</h2>
          <p><strong>Gênero:</strong> {filme.genero}</p>
          <p><strong>Ano:</strong> {filme.ano}</p>
          <p><strong>Duração:</strong> {filme.duracao}</p>
          <p><strong>Sinopse:</strong> {filme.sinopse}</p>

          <Link to="/" className="btn-voltar">
            ← Voltar para início
          </Link>
        </div>
      </div>
    </main>
  )
}

export default DetalhesFilme