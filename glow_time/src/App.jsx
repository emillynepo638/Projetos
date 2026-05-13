import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FormAgendamento from './components/FormAgendamento'
import ListaAgendamentos from './components/ListaAgendamentos'
import Filtros from './components/Filtros'
import PainelResumo from './components/PainelResumo'
import { api } from './services/api'

function App() {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState(null)

  const [filtroProfissional, setFiltroProfissional] = useState('')
  const [filtroData, setFiltroData] = useState('')
  const [buscaNome, setBuscaNome] = useState('')

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('bellaagenda-theme') === 'dark'
  })

  useEffect(() => {
    buscarAgendamentos()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('bellaagenda-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  async function buscarAgendamentos() {
    try {
      setLoading(true)
      const response = await api.get('/agendamentos')
      setAgendamentos(response.data)
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  async function salvarAgendamento(payload) {
    try {
      if (agendamentoEmEdicao) {
        const response = await api.put(`/agendamentos/${agendamentoEmEdicao.id}`, payload)

        setAgendamentos((estadoAnterior) =>
          estadoAnterior.map((item) =>
            item.id === agendamentoEmEdicao.id ? response.data : item
          )
        )

        setAgendamentoEmEdicao(null)
        return
      }

      const response = await api.post('/agendamentos', payload)
      setAgendamentos((estadoAnterior) => [...estadoAnterior, response.data])
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
    }
  }

  async function cancelarAgendamento(id) {
    try {
      await api.delete(`/agendamentos/${id}`)
      setAgendamentos((estadoAnterior) => estadoAnterior.filter((item) => item.id !== id))

      if (agendamentoEmEdicao && agendamentoEmEdicao.id === id) {
        setAgendamentoEmEdicao(null)
      }
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error)
    }
  }

  function editarAgendamento(item) {
    setAgendamentoEmEdicao(item)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function limparFiltros() {
    setFiltroProfissional('')
    setFiltroData('')
    setBuscaNome('')
  }

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter((item) => {
      const bateProfissional = filtroProfissional
        ? item.profissional === filtroProfissional
        : true

      const bateData = filtroData ? item.data === filtroData : true

      const bateNome = buscaNome
        ? item.nome.toLowerCase().includes(buscaNome.toLowerCase())
        : true

      return bateProfissional && bateData && bateNome
    })
  }, [agendamentos, filtroProfissional, filtroData, buscaNome])

  const faturamentoPrevisto = useMemo(() => {
    return agendamentos.reduce((total, item) => total + Number(item.preco), 0)
  }, [agendamentos])

  function toggleDarkMode() {
    setDarkMode((prev) => !prev)
  }

  return (
    <div className="page">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        totalAgendamentos={agendamentos.length}
        faturamentoPrevisto={faturamentoPrevisto}
      />

      <main className="main-content">
        <div className="top-grid">
          <FormAgendamento
            agendamentos={agendamentos}
            onSalvar={salvarAgendamento}
            agendamentoEmEdicao={agendamentoEmEdicao}
            cancelarEdicao={() => setAgendamentoEmEdicao(null)}
          />

          <PainelResumo agendamentos={agendamentos} />
        </div>

        <Filtros
          filtroProfissional={filtroProfissional}
          setFiltroProfissional={setFiltroProfissional}
          filtroData={filtroData}
          setFiltroData={setFiltroData}
          buscaNome={buscaNome}
          setBuscaNome={setBuscaNome}
          limparFiltros={limparFiltros}
        />

        {loading ? (
          <section className="card">
            <div className="empty-box">
              <p>Carregando agendamentos...</p>
            </div>
          </section>
        ) : (
          <ListaAgendamentos
            agendamentos={agendamentosFiltrados}
            onEditar={editarAgendamento}
            onCancelar={cancelarAgendamento}
          />
        )}
      </main>
    </div>
  )
}

export default App