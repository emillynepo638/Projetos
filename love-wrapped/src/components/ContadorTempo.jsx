import { useEffect, useState } from "react";

function calcularTempo(dataInicio) {
  const inicio = new Date(dataInicio);
  const agora = new Date();

  let anos = agora.getFullYear() - inicio.getFullYear();
  let meses = agora.getMonth() - inicio.getMonth();
  let dias = agora.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += ultimoMes.getDate();
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const diferenca = agora - inicio;
  const horasTotais = Math.floor(diferenca / (1000 * 60 * 60));
  const segundos = Math.floor((diferenca / 1000) % 60);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);

  return { anos, meses, dias, horas, minutos, segundos, horasTotais };
}

function ContadorTempo({ dataInicio, casal }) {
  const [tempo, setTempo] = useState(calcularTempo(dataInicio));

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo(calcularTempo(dataInicio));
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dataInicio]);

  return (
    <section className="card">
      <h2>Sobre o casal</h2>
      <h3>
        {casal.nome_1} e {casal.nome_2}
      </h3>
      <p>Juntos desde {casal.data_especial}</p>

      <div className="contador-grid">
        <div><strong>{tempo.anos}</strong><span>Anos</span></div>
        <div><strong>{tempo.meses}</strong><span>Meses</span></div>
        <div><strong>{tempo.dias}</strong><span>Dias</span></div>
        <div><strong>{tempo.horas}</strong><span>Horas</span></div>
        <div><strong>{tempo.minutos}</strong><span>Minutos</span></div>
        <div><strong>{tempo.segundos}</strong><span>Segundos</span></div>
      </div>

      <div className="horas-juntos">
        <p>Horas juntos</p>
        <strong>{tempo.horasTotais.toLocaleString("pt-BR")}</strong>
      </div>
    </section>
  );
}

export default ContadorTempo;