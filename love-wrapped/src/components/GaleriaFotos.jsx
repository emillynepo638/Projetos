import { useEffect, useState } from "react";

const fotos = [
  "/fotos/foto1.jpeg",
  "/fotos/foto2.jpeg",
  "/fotos/foto3.jpeg",
  "/fotos/foto4.jpeg",
  "/fotos/foto5.jpeg",
  "/fotos/foto6.jpeg",
  "/fotos/foto7.jpeg",
  "/fotos/foto8.jpeg",
  "/fotos/foto9.jpeg",
  "/fotos/foto10.jpeg",
  "/fotos/foto11.jpeg",
];

function GaleriaFotos() {
  const [fotoAtual, setFotoAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFotoAtual((atual) => (atual + 1) % fotos.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="card">
      <h2>Momentos! 🤍</h2>
      <p>Você esteve presente em muitos momentos especiais.</p>

      <div className="carrossel-fotos">
        <img
          key={fotoAtual}
          src={fotos[fotoAtual]}
          alt={`Momento ${fotoAtual + 1}`}
        />
      </div>

      <div className="bolinhas">
        {fotos.map((_, index) => (
          <button
            key={index}
            className={index === fotoAtual ? "ativa" : ""}
            onClick={() => setFotoAtual(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default GaleriaFotos;