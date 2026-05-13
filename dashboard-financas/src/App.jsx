import { useEffect, useMemo, useState } from 'react'
import Cabecalho from './components/Cabecalho'
import ResumoCards from './components/ResumoCards'
import FormTransacao from './components/FormTransacao'
import Filtros from './components/Filtros'
import ListaTransacoes from './components/ListaTransacoes'
import Graficos from './components/Graficos'
import UltimosGastos from './components/UltimosGastos'
import { meses } from './data/dados'

function App() {
  const [transacoes, setTransacoes] = useState(() => {
    const dadosSalvos = localStorage.getItem('financas_transacoes')
    return dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [
          {
            id: 1,
            descricao: 'Salário',
            valor: 4200,
            tipo: 'receita',
            mes: 'Março',
            categoria: 'Trabalho',
            data: '2026-03-05',
          },
          {
            id: 2,
            descricao: 'Supermercado',
            valor: 380,
            tipo: 'despesa',
            mes: 'Março',
            categoria: 'Alimentação',
            data: '2026-03-08',
          },
          {
            id: 3,
            descricao: 'Netflix',
            valor: 39.9,
            tipo: 'despesa',
            mes: 'Março',
            categoria: 'Assinaturas',
            data: '2026-03-10',
          },
          {
            id: 4,
            descricao: 'Freelance',
            valor: 850,
            tipo: 'receita',
            mes: 'Fevereiro',
            categoria: 'Trabalho',
            data: '2026-02-20',
          },
          {
            id: 5,
            descricao: 'Farmácia',
            valor: 75,
            tipo: 'despesa',
            mes: 'Fevereiro',
            categoria: 'Saúde',
            data: '2026-02-22',
          },
        ]
  })

  const [mesSelecionado, setMesSelecionado] = useState('Todos')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas')
  const [busca, setBusca] = useState('')
  const [modoEscuro, setModoEscuro] = useState(() => {
    const salvo = localStorage.getItem('financas_modo_escuro')
    return salvo ? JSON.parse(salvo) : false
  })
  const [transacaoEditando, setTransacaoEditando] = useState(null)

  useEffect(() => {
    localStorage.setItem('financas_transacoes', JSON.stringify(transacoes))
  }, [transacoes])

  useEffect(() => {
    localStorage.setItem('financas_modo_escuro', JSON.stringify(modoEscuro))
    document.body.classList.toggle('dark', modoEscuro)
  }, [modoEscuro])

  function adicionarTransacao(novaTransacao) {
    setTransacoes((prev) => [
      {
        ...novaTransacao,
        id: Date.now(),
      },
      ...prev,
    ])
  }

  function removerTransacao(id) {
    setTransacoes((prev) => prev.filter((item) => item.id !== id))
    if (transacaoEditando?.id === id) {
      setTransacaoEditando(null)
    }
  }

  function editarTransacao(transacaoAtualizada) {
    setTransacoes((prev) =>
      prev.map((item) =>
        item.id === transacaoAtualizada.id ? transacaoAtualizada : item,
      ),
    )
    setTransacaoEditando(null)
  }

  const categoriasDisponiveis = useMemo(() => {
    const lista = transacoes.map((item) => item.categoria)
    return [...new Set(lista)].sort()
  }, [transacoes])

  const transacoesFiltradas = useMemo(() => {
    return transacoes.filter((item) => {
      const filtroMes =
        mesSelecionado === 'Todos' || item.mes === mesSelecionado

      const filtroCategoria =
        categoriaSelecionada === 'Todas' ||
        item.categoria === categoriaSelecionada

      const filtroBusca = item.descricao
        .toLowerCase()
        .includes(busca.toLowerCase())

      return filtroMes && filtroCategoria && filtroBusca
    })
  }, [transacoes, mesSelecionado, categoriaSelecionada, busca])

  const totalReceitas = transacoesFiltradas
    .filter((item) => item.tipo === 'receita')
    .reduce((acc, item) => acc + Number(item.valor), 0)

  const totalDespesas = transacoesFiltradas
    .filter((item) => item.tipo === 'despesa')
    .reduce((acc, item) => acc + Number(item.valor), 0)

  const saldo = totalReceitas - totalDespesas

  const ultimosGastos = [...transacoes]
    .filter((item) => item.tipo === 'despesa')
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5)

  const dadosPizza = useMemo(() => {
    const despesas = transacoesFiltradas.filter((item) => item.tipo === 'despesa')

    const agrupado = despesas.reduce((acc, item) => {
      const existente = acc.find((dado) => dado.name === item.categoria)

      if (existente) {
        existente.value += Number(item.valor)
      } else {
        acc.push({
          name: item.categoria,
          value: Number(item.valor),
        })
      }

      return acc
    }, [])

    return agrupado
  }, [transacoesFiltradas])

  const dadosMes = useMemo(() => {
    return meses.map((mes) => {
      const receitasMes = transacoes
        .filter((item) => item.mes === mes && item.tipo === 'receita')
        .reduce((acc, item) => acc + Number(item.valor), 0)

      const despesasMes = transacoes
        .filter((item) => item.mes === mes && item.tipo === 'despesa')
        .reduce((acc, item) => acc + Number(item.valor), 0)

      return {
        mes,
        receitas: receitasMes,
        despesas: despesasMes,
      }
    })
  }, [transacoes])

  return (
    <div className="app">
      <Cabecalho
        modoEscuro={modoEscuro}
        setModoEscuro={setModoEscuro}
      />

      <main className="container">
        <ResumoCards
          receitas={totalReceitas}
          despesas={totalDespesas}
          saldo={saldo}
        />

        <section className="layout-dashboard">
          <div className="coluna coluna-esquerda">
            <FormTransacao
              onAdicionar={adicionarTransacao}
              onEditar={editarTransacao}
              transacaoEditando={transacaoEditando}
              cancelarEdicao={() => setTransacaoEditando(null)}
            />

            <Filtros
              mesSelecionado={mesSelecionado}
              setMesSelecionado={setMesSelecionado}
              categoriaSelecionada={categoriaSelecionada}
              setCategoriaSelecionada={setCategoriaSelecionada}
              busca={busca}
              setBusca={setBusca}
              categoriasDisponiveis={categoriasDisponiveis}
            />

            <ListaTransacoes
              transacoes={transacoesFiltradas}
              onRemover={removerTransacao}
              onEditar={setTransacaoEditando}
            />
          </div>

          <div className="coluna coluna-direita">
            <Graficos
              dadosPizza={dadosPizza}
              dadosMes={dadosMes}
            />

            <UltimosGastos gastos={ultimosGastos} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App