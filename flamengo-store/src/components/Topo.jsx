import { NavLink, Link } from 'react-router-dom'
import logoFlamengo from '../assets/logo-flamengo.png'

function Topo() {
  return (
    <header>
      <div className="faixa-topo">
        FRETE GRÁTIS PARA TODO O BRASIL NAS COMPRAS ACIMA DE R$ 499,99
      </div>

      <div className="menu-principal">
        <div className="logo-area">
          <Link to="/" className="logo-link">
            <img
              src={logoFlamengo}
              alt="Logo do Flamengo"
              className="logo-flamengo"
            />

            <span className="logo-texto">LOJA OFICIAL</span>
          </Link>
        </div>

        <nav className="nav-links">
          <NavLink to="/">INÍCIO</NavLink>
          <NavLink to="/vitrine">VITRINE</NavLink>
          <NavLink to="/sobre">SOBRE</NavLink>
          <NavLink to="/contato">CONTATO</NavLink>
        </nav>

        <div className="acoes-topo">
          <span>🔎</span>
          <span>🛒</span>
          <span>👤</span>
        </div>
      </div>
    </header>
  )
}

export default Topo
