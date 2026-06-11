import { useState } from "react";

function MensagemEspecial({ mensagem }) {
  const [aberta, setAberta] = useState(false);

  return (
    <section className="carta-section">
      {!aberta ? (
        <div className="envelope-card" onClick={() => setAberta(true)}>
          <div className="envelope">
            <div className="aba"></div>
            <div className="lacinho">❤️</div>
          </div>

          <h2>Carta especial</h2>
          <p>Tenho uma mensagem guardada para você</p>
          <button>Abrir</button>
        </div>
      ) : (
        <div className="carta-aberta">
          <h2>Mensagem especial</h2>
          <p>{mensagem}</p>

          <button onClick={() => setAberta(false)}>
            Fechar carta
          </button>
        </div>
      )}
    </section>
  );
}

export default MensagemEspecial;