import { Routes, Route } from 'react-router-dom'
import Topo from './components/Topo'
import Footer from './components/Footer'
import Home from './pages/Home'
import Vitrine from './pages/Vitrine'
import DetalhesProduto from './pages/DetalhesProduto'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import NaoEncontrada from './pages/NaoEncontrada'

function App() {
  return (
    <div className="app">
      <Topo />

      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vitrine" element={<Vitrine />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
