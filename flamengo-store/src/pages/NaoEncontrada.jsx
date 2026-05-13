import { Link } from 'react-router-dom'

function NaoEncontrada() {
  return (
    <section className="pagina-erro container">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/" className="botao-principal">
        Voltar para o início
      </Link>
    </section>
  )
}

export default NaoEncontrada
