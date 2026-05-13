import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Banner() {
  const slides = [
    {
      imagem:
        'https://classic.exame.com/wp-content/uploads/2025/09/bridgerton-s4-imagem-4.jpg',
      titulo: 'Bridgerton',
      subtitulo: 'Nova temporada com mais romance, segredos e reviravoltas',
      descricao:
        'A alta sociedade londrina está de volta com novos escândalos, paixões e disputas em uma temporada ainda mais envolvente.',
      link: '/filme/10'
    },
    {
      imagem:
        'https://tribunadoplanalto.com.br/wp-content/uploads/2026/01/Bridgerton-4-temporadaaaaa.webp',
      titulo: 'Bridgerton',
      subtitulo: 'Um universo de luxo, romance e intrigas',
      descricao:
        'Descubra novos acontecimentos da família Bridgerton em uma história marcada por elegância e emoção.',
      link: '/filme/10'
    },
    {
      imagem:
        'https://f.i.uol.com.br/fotografia/2025/02/14/173956260467af9e6c1bec7_1739562604_3x2_rt.jpg',
      titulo: 'Bridgerton',
      subtitulo: 'A temporada mais aguardada está em destaque',
      descricao:
        'Entre bailes, escândalos e promessas, a nova fase da série entrega uma experiência visual ainda mais marcante.',
      link: '/filme/10'
    },
    {
      imagem:
        'https://s2-techtudo.glbimg.com/26W1gsbIAunv-IVGirD5R1-ZDVA=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2026/c/C/OR5iwXT1Oii0AlQpcueg/0002.jpg',
      titulo: 'Bridgerton',
      subtitulo: 'Uma história envolvente para quem ama drama e romance',
      descricao:
        'Acompanhe os novos capítulos dessa trama que mistura emoção, elegância e grandes decisões.',
      link: '/filme/10'
    }
  ]

  const [slideAtual, setSlideAtual] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [slides.length])

  return (
    <section
      className="banner"
      id="banner"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(2,6,23,0.96) 18%, rgba(2,6,23,0.72) 45%, rgba(2,6,23,0.30) 75%), url('${slides[slideAtual].imagem}')`
      }}
    >
      <div className="banner-conteudo">
        <span className="banner-tag">NOVA TEMPORADA</span>
        <h1>{slides[slideAtual].titulo}</h1>
        <h2>{slides[slideAtual].subtitulo}</h2>
        <p>{slides[slideAtual].descricao}</p>

        <div className="banner-botoes">
          <Link to={slides[slideAtual].link} className="btn-banner-principal">
            Assistir
          </Link>

          <Link to={slides[slideAtual].link} className="btn-banner-secundario">
            Mais informações
          </Link>
        </div>

        <div className="banner-indicadores">
          {slides.map((_, index) => (
            <button
              key={index}
              className={slideAtual === index ? 'indicador ativo' : 'indicador'}
              onClick={() => setSlideAtual(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner