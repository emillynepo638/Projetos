import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import CardFilme from '../components/CardFilme'
import FiltroGenero from '../components/FiltroGenero'

function Home({ busca }) {
  const [titulos, setTitulos] = useState([])
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos')

  const [favoritos, setFavoritos] = useState(() => {
    const favoritosSalvos = localStorage.getItem('favoritos')
    return favoritosSalvos ? JSON.parse(favoritosSalvos) : []
  })

  const [reacoes, setReacoes] = useState(() => {
    const reacoesSalvas = localStorage.getItem('reacoes')
    return reacoesSalvas ? JSON.parse(reacoesSalvas) : {}
  })

  useEffect(() => {
    fetch('http://localhost:3001/filmes')
      .then((res) => res.json())
      .then((dados) => setTitulos(dados))
      .catch((erro) => console.log('Erro ao buscar títulos:', erro))
  }, [])

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  useEffect(() => {
    localStorage.setItem('reacoes', JSON.stringify(reacoes))
  }, [reacoes])

  function toggleFavorito(filme) {
    const jaExiste = favoritos.some((item) => item.id === filme.id)

    if (jaExiste) {
      const novaLista = favoritos.filter((item) => item.id !== filme.id)
      setFavoritos(novaLista)
    } else {
      setFavoritos([...favoritos, filme])
    }
  }

  function definirReacao(id, tipo) {
    setReacoes((prev) => ({
      ...prev,
      [id]: prev[id] === tipo ? null : tipo
    }))
  }

  const generos = [...new Set(titulos.map((item) => item.genero))]

  const titulosFiltrados =
    generoSelecionado === 'Todos'
      ? titulos
      : titulos.filter((item) => item.genero === generoSelecionado)

  const titulosOrdenados = [...titulosFiltrados].sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  )

  const termoBusca = busca.trim().toLowerCase()

  const resultadosBusca = termoBusca
    ? titulosOrdenados.filter((item) =>
        item.titulo.toLowerCase().includes(termoBusca)
      )
    : []

  const filmes = titulosOrdenados.filter((item) => item.tipo === 'Filme')
  const series = titulosOrdenados.filter((item) => item.tipo === 'Série')

  return (
    <main>
      {termoBusca && (
        <section className="resultados-busca-topo">
          <h2>Resultados para: "{busca}"</h2>

          {resultadosBusca.length > 0 ? (
            <div className="grid-filmes">
              {resultadosBusca.map((filme) => (
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
          ) : (
            <p className="mensagem">Nenhum título encontrado.</p>
          )}
        </section>
      )}

      {!termoBusca && <Banner />}

      {!termoBusca && (
        <>
          <section className="catalogo-topo">
            <div className="catalogo-intro">
              <h2>Explore o catálogo</h2>
              <p>Filtre por gênero e navegue entre filmes e séries.</p>
            </div>

            <FiltroGenero
              generos={generos}
              generoSelecionado={generoSelecionado}
              setGeneroSelecionado={setGeneroSelecionado}
            />
          </section>

          <section className="secao-catalogo" id="filmes">
            <h2 className="titulo-secao">Filmes</h2>
            <div className="grid-filmes">
              {filmes.map((filme) => (
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

          <section className="secao-catalogo" id="series">
            <h2 className="titulo-secao">Séries</h2>
            <div className="grid-filmes">
              {series.map((filme) => (
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
        </>
      )}
    </main>
  )
}

export default Home