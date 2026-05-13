function ListaTransacoes({ transacoes, onRemover, onEditar }) {
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
        <h3>Histórico de transações</h3>
        <p>Veja, edite ou exclua as movimentações cadastradas.</p>
      </div>

      {transacoes.length === 0 ? (
        <div className="lista-vazia">
          <p>Nenhuma transação encontrada com os filtros atuais.</p>
        </div>
      ) : (
        <div className="lista-transacoes">
          {transacoes.map((item) => (
            <article className="item-transacao" key={item.id}>
              <div className="item-info">
                <span
                  className={`bolinha ${item.tipo === 'receita' ? 'receita' : 'despesa'}`}
                ></span>

                <div>
                  <h4>{item.descricao}</h4>
                  <p>
                    {item.categoria} • {item.mes} • {formatarData(item.data)}
                  </p>
                </div>
              </div>

              <div className="item-acoes">
                <strong
                  className={
                    item.tipo === 'receita'
                      ? 'texto-receita'
                      : 'texto-despesa'
                  }
                >
                  {item.tipo === 'receita' ? '+ ' : '- '}
                  {formatarMoeda(item.valor)}
                </strong>

                <div className="grupo-botoes">
                  <button
                    className="botao-acao editar"
                    onClick={() => onEditar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="botao-acao excluir"
                    onClick={() => onRemover(item.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListaTransacoes