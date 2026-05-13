function Sobre() {
  return (
    <section className="pagina-sobre container">
      <div className="titulo-secao">
        <span className="linha-vermelha"></span>
        <h2>Sobre o projeto</h2>
      </div>

      <div className="sobre-grid">
        <div className="sobre-imagem-box">
          <img
            src="/src/assets/sobre-projeto.jpeg"
            alt="Imagem representativa do projeto"
            className="sobre-imagem"
          />
        </div>

        <div className="sobre-texto">
          <p>
            Este projeto foi desenvolvido como trabalho final do curso de
            Front-End, com o tema inspirado na loja oficial do Flamengo.
            Escolhi esse tema por ser algo marcante visualmente e por permitir
            criar uma vitrine forte, moderna e com identidade.
          </p>

          <p>
            Durante o desenvolvimento, utilizei React para componentização,
            React Router para as páginas e JSON-Server para simular uma API
            local com os produtos da loja. Também trabalhei com fetch,
            useState, useEffect, rotas dinâmicas com id e organização por
            componentes.
          </p>

          <p>
            Esse projeto representa minha evolução ao longo do curso, reunindo
            estrutura, consumo de dados, navegação entre páginas, formulário e
            estilização inspirada em um e-commerce real.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Sobre
