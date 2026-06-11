function TelaPresente({ casal, abrirPresente }) {
  return (
    <main className="tela-presente">
      <div className="card-presente">
        <span className="tag verde">Wrapped</span>

        <h1>
          {casal.nome_1} preparou um <span>presente</span> especial!
        </h1>

        <p>
          Um momento único feito com carinho para celebrar a história de vocês.
        </p>

        <button onClick={abrirPresente}>Abrir Nosso Presente</button>
      </div>
    </main>
  );
}

export default TelaPresente;