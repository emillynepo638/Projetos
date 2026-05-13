function UltimosGastos({ gastos }) {
  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <section className="bloco animar-subida">
      <div className="bloco-topo">
        <h3>Últimos gastos</h3>
        <p>Resumo rápido das despesas mais recentes.</p>
      </div>

      {gastos.length === 0 ? (
        <div className="lista-vazia">
          <p>Ainda não existem gastos cadastrados.</p>
        </div>
      ) : (
        <div className="ultimos-gastos">
          {gastos.map((item) => (
            <div className="linha-gasto" key={item.id}>
              <div>
                <h4>{item.descricao}</h4>
                <p>
                  {item.categoria} • {formatarData(item.data)}
                </p>
              </div>

              <strong className="texto-despesa">
                - {formatarMoeda(item.valor)}
              </strong>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default UltimosGastos