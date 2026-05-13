import { useState } from 'react'

function FormularioContato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!nome || !email || !mensagem) {
      alert('Preencha todos os campos.')
      return
    }

    setEnviado(true)
    setNome('')
    setEmail('')
    setMensagem('')
  }

  return (
    <section className="secao-formulario">
      <div className="titulo-secao">
        <span className="linha-vermelha"></span>
        <h2>Fale com a loja</h2>
      </div>

      <form className="formulario-contato" onSubmit={handleSubmit}>
        <div className="grupo-campos">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Digite sua mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        ></textarea>

        <button type="submit" className="botao-principal">
          Enviar mensagem
        </button>

        {enviado && (
          <p className="mensagem-sucesso">
            Mensagem enviada com sucesso!
          </p>
        )}
      </form>
    </section>
  )
}

export default FormularioContato
