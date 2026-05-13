import { motion } from 'framer-motion'

function ListaAgendamentos({ agendamentos, onEditar, onCancelar }) {
  function formatarData(data) {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  const ordenados = [...agendamentos].sort((a, b) => {
    const dataA = new Date(`${a.data}T${a.horario}:00`)
    const dataB = new Date(`${b.data}T${b.horario}:00`)
    return dataA - dataB
  })

  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-top">
        <h2>Lista de agendamentos</h2>
        <p>Visualize, edite ou cancele os atendimentos cadastrados.</p>
      </div>

      {ordenados.length === 0 ? (
        <div className="empty-box">
          <p>Nenhum agendamento encontrado.</p>
        </div>
      ) : (
        <div className="appointments-list">
          {ordenados.map((item, index) => (
            <motion.article
              className="appointment-card"
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div className="appointment-content">
                <h3>{item.nome}</h3>
                <p><strong>Telefone:</strong> {item.telefone}</p>
                <p><strong>Serviço:</strong> {item.servico}</p>
                <p><strong>Profissional:</strong> {item.profissional}</p>
                <p><strong>Data:</strong> {formatarData(item.data)}</p>
                <p><strong>Horário:</strong> {item.horario}</p>
                <p><strong>Duração:</strong> {item.duracao}</p>
                <p><strong>Valor:</strong> R$ {item.preco}</p>
              </div>

              <div className="appointment-actions">
                <button className="edit-btn" onClick={() => onEditar(item)}>
                  Editar
                </button>
                <button className="cancel-btn" onClick={() => onCancelar(item.id)}>
                  Cancelar
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default ListaAgendamentos