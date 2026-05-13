import { useEffect, useState } from 'react'
import CardFilme from '../components/CardFilme'

function Favoritos() {
  const [favoritos, setFavoritos] = useState([])
  const [reacoes, setReacoes] = useState(() => {
    const reacoesSalvas = localStorage.getItem('reacoes')
    return reacoesSalvas ? JSON.parse(reacoesSalvas) : {}
  })

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem('favoritos')
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('reacoes', JSON.stringify(reacoes))
  }, [reacoes])

  function toggleFavorito(filme) {
    const novaLista = favoritos.filter((item) => item.id !== filme.id)
    setFavoritos(novaLista)
    localStorage.setItem('favoritos', JSON.stringify(novaLista))
  }

  function definirReacao(id, tipo) {
    setReacoes((prev) => ({
      ...prev,
      [id]: prev[id] === tipo ? null : tipo
    }))
  }

  return (
    <main className="container-favoritos">
      <section className="hero-favoritos">
        <h2>Seus favoritos</h2>
        <p>Os títulos que você guardou para rever quando quiser.</p>
      </section>

      {favoritos.length === 0 ? (
        <p className="mensagem">Você ainda não favoritou nenhum título.</p>
      ) : (
        <section className="secao-catalogo">
          <div className="grid-filmes">
            {favoritos.map((filme) => (
              <CardFilme
                key={filme.id}
                filme={filme}
                favoritos={favoritos}
                toggleFavorito={toggleFavorito}
                reacoes={reacoes}
                definirReacao={definirReacao}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Favoritos