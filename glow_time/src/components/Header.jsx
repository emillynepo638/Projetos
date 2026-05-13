import { motion } from 'framer-motion'

function Header({ darkMode, toggleDarkMode, totalAgendamentos, faturamentoPrevisto }) {
  return (
    <header className="hero">
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="hero-badge">Sistema de Agendamento</span>
        <h1>BellaAgenda</h1>
        <p>
          Um sistema moderno para gerenciamento de atendimentos de salão de beleza,
          com foco em organização, experiência do usuário e rotina real de mercado.
        </p>

        <div className="hero-stats">
          <div className="stat-card">
            <strong>{totalAgendamentos}</strong>
            <span>Agendamentos</span>
          </div>

          <div className="stat-card">
            <strong>R$ {faturamentoPrevisto}</strong>
            <span>Previsão de faturamento</span>
          </div>

          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>
      </motion.div>
    </header>
  )
}

export default Header