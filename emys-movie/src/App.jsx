import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cabecalho from './components/Cabecalho'
import Footer from './components/Footer'
import Home from './pages/Home'
import DetalhesFilme from './pages/DetalhesFilme'
import Favoritos from './pages/Favoritos'
import Loading from './components/Loading'

function App() {
  const location = useLocation()
  const [carregandoTela, setCarregandoTela] = useState(false)
  const [busca, setBusca] = useState('')

  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema') || 'dark'
  })

  useEffect(() => {
    setCarregandoTela(true)
    const timer = setTimeout(() => setCarregandoTela(false), 700)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    document.body.className = tema
    localStorage.setItem('tema', tema)
  }, [tema])

  function alternarTema() {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app">
      <Cabecalho
        alternarTema={alternarTema}
        tema={tema}
        busca={busca}
        setBusca={setBusca}
      />

      {carregandoTela ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home busca={busca} />} />
          <Route path="/filme/:id" element={<DetalhesFilme />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      )}

      <Footer />
    </div>
  )
}

export default App