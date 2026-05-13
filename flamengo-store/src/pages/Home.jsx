import Banner from '../components/Banner'
import FormularioContato from '../components/FormularioContato'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <Banner />

      <section className="secao-destaques container">
        <div className="titulo-secao">
          <span className="linha-vermelha"></span>
          <h2>Categorias em destaque</h2>
        </div>

        <div className="grade-categorias">
          <div className="categoria-box">
            <h3>Masculino</h3>
            <p>Camisas, calças e casacos inspirados no Flamengo.</p>
          </div>

          <div className="categoria-box">
            <h3>Feminino</h3>
            <p>Peças com estilo moderno, conforto e identidade rubro-negra.</p>
          </div>

          <div className="categoria-box">
            <h3>Infantil</h3>
            <p>Produtos pensados para os pequenos torcedores da nação.</p>
          </div>

          <div className="categoria-box">
            <h3>Acessórios</h3>
            <p>Itens para complementar o visual e a rotina do torcedor.</p>
          </div>
        </div>

        <div className="area-centro">
          <Link to="/vitrine" className="botao-principal">
            Acessar vitrine
          </Link>
        </div>
      </section>

      <FormularioContato />
    </>
  )
}

export default Home
