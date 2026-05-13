import { useEffect, useState } from 'react'
import { categoriasPadrao, meses } from '../data/dados'

function FormTransacao({
  onAdicionar,
  onEditar,
  transacaoEditando,
  cancelarEdicao,
}) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('receita')
  const [mes, setMes] = useState('Janeiro')
  const [categoria, setCategoria] = useState('Outros')
  const [data, setData] = useState('')

  useEffect(() => {
    if (transacaoEditando) {
      setDescricao(transacaoEditando.descricao)
      setValor(transacaoEditando.valor)
      setTipo(transacaoEditando.tipo)
      setMes(transacaoEditando.mes)
      setCategoria(transacaoEditando.categoria)
      setData(transacaoEditando.data)
    } else {
      limparFormulario()
    }
  }, [transacaoEditando])

  function limparFormulario() {
    setDescricao('')
    setValor('')
    setTipo('receita')
    setMes('Janeiro')
    setCategoria('Outros')
    setData('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!descricao.trim() || !valor || Number(valor) <= 0 || !data) {
      alert('Preencha todos os campos corretamente.')
      return
    }

    const payload = {
      descricao,
      valor: Number(valor),
      tipo,
      mes,
      categoria,
      data,
    }

    if (transacaoEditando) {
      onEditar({
        ...payload,
        id: transacaoEditando.id,
      })
    } else {
      onAdicionar(payload)
    }

    limparFormulario()
  }

  function handleCancelar() {
    limparFormulario()
    cancelarEdicao()
  }

  return (
    <section className="bloco animar-subida">
      <div className="bloco-topo">
        <h3>{transacaoEditando ? 'Editar transação' : 'Nova transação'}</h3>
        <p>
          {transacaoEditando
            ? 'Atualize os dados da movimentação selecionada.'
            : 'Cadastre receitas e despesas no seu controle financeiro.'}
        </p>
      </div>

      <form className="form-transacao" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: salário, mercado, aluguel..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="dupla">
          <div className="campo">
            <label>Valor</label>
            <input
              type="number"
              placeholder="Digite o valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
        </div>

        <div className="tripla">
          <div className="campo">
            <label>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div className="campo">
            <label>Mês</label>
            <select value={mes} onChange={(e) => setMes(e.target.value)}>
              {meses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categoriasPadrao.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="acoes-formulario">
          <button type="submit" className="botao-principal">
            {transacaoEditando ? 'Salvar alteração' : 'Adicionar transação'}
          </button>

          {transacaoEditando && (
            <button
              type="button"
              className="botao-secundario"
              onClick={handleCancelar}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default FormTransacao