function Constelacao({ casal }) {
  return (
    <section className="constelacao">
      <h2>{casal.nome_1} e {casal.nome_2}</h2>

      <img
        src="/fotos/constelacao-real.png"
        alt="Constelação real do nosso dia"
        className="constelacao-real"
      />

      <p className="frase">
        "O céu quando nossos mundos se encontraram ✨🤍"
      </p>

      <p className="cidade">{casal.cidade}</p>
      <p>23 de dezembro de 2021</p>
    </section>
  );
}

export default Constelacao;