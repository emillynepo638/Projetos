import { useEffect, useRef, useState } from "react";
import { supabase } from "./services/supabase";
import TelaPresente from "./components/TelaPresente";
import PlayerMusica from "./components/PlayerMusica";
import ContadorTempo from "./components/ContadorTempo";
import MensagemEspecial from "./components/MensagemEspecial";
import GaleriaFotos from "./components/GaleriaFotos";
import Constelacao from "./components/Constelacao";
import "./index.css";

function App() {
  const [casal, setCasal] = useState(null);
  const [abriu, setAbriu] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    async function buscarDados() {
      const { data, error } = await supabase.from("casal").select("*").single();

      if (error) {
        console.log(error);
        return;
      }

      setCasal(data);
    }

    buscarDados();
  }, []);

  function abrirPresente() {
    setAbriu(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(() => {
          console.log("O navegador bloqueou o áudio.");
        });
      }
    }, 300);
  }

  if (!casal) {
    return <div className="loading">Carregando nosso presente...</div>;
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/musicas/duas-metades.mp3" type="audio/mpeg" />
      </audio>

      {!abriu ? (
        <TelaPresente casal={casal} abrirPresente={abrirPresente} />
      ) : (
        <main className="app">
          <section className="hero">
            <div className="progress"></div>

            <img
              src="/fotos/capa.jpeg"
              className="foto-capa"
              alt="Nós"
            />

            <p className="tag tag-romantica">DESDE 23.12.2021</p>

            <div className="chuva-coracoes">
              <span>❤️</span>
              <span>💕</span>
              <span>💖</span>
              <span>❤️</span>
              <span>💕</span>
            </div>

            <h1>
              {casal.nome_1} & {casal.nome_2}
            </h1>

            <p>Os momentos que marcaram essa relação ❤️</p>
          </section>

          <PlayerMusica casal={casal} audioRef={audioRef} />
          <ContadorTempo dataInicio={casal.data_inicio} casal={casal} />
          <MensagemEspecial mensagem={casal.mensagem} />
          <GaleriaFotos />
          <Constelacao casal={casal} />
        </main>
      )}
    </>
  );
}

export default App;