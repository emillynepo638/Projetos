import { useEffect, useMemo, useState } from 'react'
import { horariosFixos, profissionais, servicos } from '../data/servicos'
import { motion } from 'framer-motion'

function FormAgendamento({
  agendamentos,
  onSalvar,
  agendamentoEmEdicao,
  cancelarEdicao
}) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [servicoId, setServicoId] = useState('')
  const [profissional, setProfissional] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  useEffect(() => {
    if (agendamentoEmEdicao) {
      const servicoEncontrado = servicos.find(
        (item) => item.nome === agendamentoEmEdicao.servico
      )

      setNome(agendamentoEmEdicao.nome)
      setTelefone(agendamentoEmEdicao.telefone)
      setServicoId(servicoEncontrado ? String(servicoEncontrado.id) : '')
      setProfissional(agendamentoEmEdicao.profissional)
      setData(agendamentoEmEdicao.data)
      setHorario(agendamentoEmEdicao.horario)
      setErro('')
      setSucesso('')
      return
    }

    limparFormulario()
  }, [agendamentoEmEdicao])

  function limparFormulario() {
    setNome('')
    setTelefone('')
    setServicoId('')
    setProfissional('')
    setData('')
    setHorario('')
    setErro('')
    setSucesso('')
  }

  function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11)

    if (numeros.length <= 10) {
      return numeros
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }

    return numeros
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }

  const servicoSelecionado = useMemo(() => {
    return servicos.find((item) => item.id === Number(servicoId))
  }, [servicoId])

  const horariosOcupados = agendamentos
    .filter((item) => {
      const mesmoProfissional = item.profissional === profissional
      const mesmaData = item.data === data
      const naoEhOMesmoEmEdicao = agendamentoEmEdicao
        ? item.id !== agendamentoEmEdicao.id
        : true

      return mesmoProfissional && mesmaData && naoEhOMesmoEmEdicao
    })
    .map((item) => item.horario)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!nome || !telefone || !servicoId || !profissional || !data || !horario) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    const dataHoraSelecionada = new Date(`${data}T${horario}:00`)
    const agora = new Date()

    if (dataHoraSelecionada < agora) {
      setErro('Escolha uma data e horário válidos no futuro.')
      return
    }

    const conflito = agendamentos.some((item) => {
      const mesmoProfissional = item.profissional === profissional
      const mesmaData = item.data === data
      const mesmoHorario = item.horario === horario
      const naoEhOMesmoEmEdicao = agendamentoEmEdicao
        ? item.id !== agendamentoEmEdicao.id
        : true

      return mesmoProfissional && mesmaData && mesmoHorario && naoEhOMesmoEmEdicao
    })

    if (conflito) {
      setErro('Esse horário já está ocupado para esse profissional.')
      return
    }

    const payload = {
      nome,
      telefone,
      servico: servicoSelecionado.nome,
      duracao: servicoSelecionado.duracao,
      preco: servicoSelecionado.preco,
      profissional,
      data,
      horario
    }

    await onSalvar(payload)
    setSucesso(agendamentoEmEdicao ? 'Agendamento atualizado com sucesso!' : 'Agendamento criado com sucesso!')

    if (!agendamentoEmEdicao) {
      limparFormulario()
    }
  }

  const dataMinima = new Date().toISOString().split('T')[0]

  return (
    <motion.section
      className="card"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-top">
        <h2>{agendamentoEmEdicao ? 'Editar agendamento' : 'Novo agendamento'}</h2>
        <p>
          Preencha os dados do atendimento, selecione data, profissional e horário.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label>Nome do cliente</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="(24) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
          />
        </div>

        <div className="field">
          <label>Serviço</label>
          <select value={servicoId} onChange={(e) => setServicoId(e.target.value)}>
            <option value="">Selecione</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} - R$ {servico.preco}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Profissional</label>
          <select value={profissional} onChange={(e) => setProfissional(e.target.value)}>
            <option value="">Selecione</option>
            {profissionais.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Data</label>
          <input
            type="date"
            min={dataMinima}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Resumo</label>
          <div className="summary-box">
            {servicoSelecionado ? (
              <>
                <strong>{servicoSelecionado.nome}</strong>
                <span>Duração: {servicoSelecionado.duracao}</span>
                <span>Valor: R$ {servicoSelecionado.preco}</span>
              </>
            ) : (
              <span>Selecione um serviço para visualizar os detalhes.</span>
            )}
          </div>
        </div>

        <div className="field field-full">
          <label>Escolha o horário</label>
          <div className="time-grid">
            {horariosFixos.map((item) => {
              const ocupado = horariosOcupados.includes(item)

              return (
                <button
                  key={item}
                  type="button"
                  className={`time-btn ${horario === item ? 'active' : ''} ${ocupado ? 'busy' : ''}`}
                  onClick={() => !ocupado && setHorario(item)}
                  disabled={ocupado}
                >
                  {ocupado ? `${item} - Ocupado` : item}
                </button>
              )
            })}
          </div>
        </div>

        {erro && <p className="message error">{erro}</p>}
        {sucesso && <p className="message success">{sucesso}</p>}

        <div className="form-actions">
          <button className="primary-btn" type="submit">
            {agendamentoEmEdicao ? 'Salvar alterações' : 'Confirmar agendamento'}
          </button>

          {agendamentoEmEdicao && (
            <button type="button" className="secondary-btn" onClick={cancelarEdicao}>
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </motion.section>
  )
}

export default FormAgendamento