function ResumoCards({ receitas, despesas, saldo }) {
  const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <section className="resumo-cards">
      <div className="card-resumo destaque-roxo">
        <p>Saldo Atual</p>
        <h2>{formatarMoeda(saldo)}</h2>
      </div>

      <div className="card-resumo destaque-verde">
        <p>Receitas</p>
        <h2>{formatarMoeda(receitas)}</h2>
      </div>

      <div className="card-resumo destaque-vermelho">
        <p>Despesas</p>
        <h2>{formatarMoeda(despesas)}</h2>
      </div>
    </section>
  )
}

export default ResumoCards