import { Link } from 'react-router-dom'

function Banner() {
  return (
    <section className="banner-home">
      <div className="banner-conteudo">
        <p className="banner-tag">Coleção inspirada na Nação Rubro-Negro</p>
        <h1>Bem-vindo à Loja Oficial Rubro-Negro</h1>
        <p className="banner-texto">
             Uma vitrine digital do Flamengo construída em React, apresentando produtos
             , detalhes individuais e integração com API fake para simulação de e-commerce.
        </p>

        <div className="banner-botoes">
          <Link to="/vitrine" className="botao-principal">
            Ver vitrine
          </Link>

          <Link to="/sobre" className="botao-secundario">
            Sobre o projeto
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Banner
