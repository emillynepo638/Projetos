import { useState } from "react";

function PlayerMusica({ casal, audioRef }) {
  const [tocando, setTocando] = useState(true);

  function pausarOuTocar() {
    if (!audioRef.current) return;

    if (tocando) {
      audioRef.current.pause();
      setTocando(false);
    } else {
      audioRef.current.play();
      setTocando(true);
    }
  }

  return (
    <section className="spotify-card">
      <div className="album">
        <div className="heart">❤️</div>
      </div>

      <div className="musica-info">
        <h2>{casal.musica_nome}</h2>
        <p>{casal.musica_artista}</p>
      </div>

      <button onClick={pausarOuTocar} className="play-btn">
        {tocando ? "⏸" : "▶"}
      </button>
    </section>
  );
}

export default PlayerMusica;