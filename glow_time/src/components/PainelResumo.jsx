import { motion } from 'framer-motion'

function PainelResumo({ agendamentos }) {
  const quantidadePorServico = agendamentos.reduce((acc, item) => {
    acc[item.servico] = (acc[item.servico] || 0) + 1
    return acc
  }, {})

  const listaResumo = Object.entries(quantidadePorServico)

  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-top">
        <h2>Painel de serviços</h2>
        <p>Resumo da quantidade de agendamentos por serviço.</p>
      </div>

      {listaResumo.length === 0 ? (
        <div className="empty-box">
          <p>Ainda não há agendamentos para gerar estatísticas.</p>
        </div>
      ) : (
        <div className="service-summary">
          {listaResumo.map(([servico, quantidade]) => (
            <div className="service-item" key={servico}>
              <span>{servico}</span>
              <strong>{quantidade}</strong>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default PainelResumo