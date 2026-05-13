import FormularioContato from '../components/FormularioContato'

function Contato() {
  return (
    <section className="container pagina-contato">
      <div className="titulo-secao">
        <span className="linha-vermelha"></span>
        <h2>Contato</h2>
      </div>

      <p className="subtitulo-pagina">
        Envie suas informações através do formulário abaixo.
      </p>

      <FormularioContato />
    </section>
  )
}

export default Contato
