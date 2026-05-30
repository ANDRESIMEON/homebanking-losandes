import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* Ícono SVG inline de montaña (logo conceptual Los Andes) */
function LogoIcon({ size = 32, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34 L14 14 L20 22 L26 10 L36 34 Z" fill={color} opacity="0.9"/>
      <path d="M14 14 L20 22 L26 10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="26" cy="10" r="2.5" fill="#c89b2a"/>
    </svg>
  );
}

const productos = [
  {
    icon: '🌾',
    titulo: 'Crédito Rural',
    desc: 'Financiamiento para productores agropecuarios desde S/ 500 hasta S/ 80,000.',
    tasa: 'Desde 18% TEA',
  },
  {
    icon: '🏪',
    titulo: 'Crédito MYPE',
    desc: 'Impulsa tu pequeña empresa con capital de trabajo flexible y rápido.',
    tasa: 'Desde 22% TEA',
  },
  {
    icon: '💰',
    titulo: 'Ahorro Andino',
    desc: 'Cuenta de ahorro sin comisiones con la mejor tasa del sistema rural.',
    tasa: 'Hasta 7% TNA',
  },
  {
    icon: '🏠',
    titulo: 'Crédito Vivienda',
    desc: 'Construye o mejora tu hogar con plazos de hasta 10 años.',
    tasa: 'Desde 14% TEA',
  },
];

const estadisticas = [
  { valor: '30+', etiqueta: 'Años de experiencia' },
  { valor: '180K', etiqueta: 'Clientes activos' },
  { valor: '110', etiqueta: 'Agencias en el país' },
  { valor: 'SBS', etiqueta: 'Supervisada por' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 2rem', height: '68px',
        background: scrolled ? 'rgba(19,94,45,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.3s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <LogoIcon size={34} />
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', lineHeight: 1.1 }}>
              CRAC Los Andes
            </div>
            <div style={{ color: '#c89b2a', fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600 }}>
              BANCA RURAL
            </div>
          </div>
        </div>

        {/* Nav links (desktop) */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.8rem' }}>
            {['Productos', 'Agencias', 'Nosotros', 'Contacto'].map(item => (
              <span key={item} style={{
                color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '0.9rem',
                fontWeight: 500, transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#e8b93a'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
              >
                {item}
              </span>
            ))}
          </div>

          {/* BOTÓN BANCA POR INTERNET — interactivo con animación pulse */}
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
            style={{ animation: 'pulse-ring 2.5s infinite', fontSize: '0.88rem', padding: '0.6rem 1.4rem' }}
          >
            🔐 Banca por Internet
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #0d4a22 0%, #1a7a3c 50%, #135e2d 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '55vw', height: '110%',
          background: 'radial-gradient(ellipse, rgba(200,155,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '0', right: '0',
          height: '120px',
          background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1440 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60 Q360 0 720 60 Q1080 120 1440 60 L1440 120 L0 120Z\' fill=\'%23f4f6f4\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
        }} />

        {/* Montañas decorativas SVG */}
        <svg style={{ position: 'absolute', bottom: '80px', left: 0, right: 0, opacity: 0.08 }}
             viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300 L200 80 L350 180 L500 40 L700 200 L900 60 L1100 160 L1300 30 L1440 120 L1440 300Z"
                fill="white"/>
        </svg>

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div className="fade-up" style={{
            display: 'inline-block',
            background: 'rgba(200,155,42,0.2)',
            border: '1px solid rgba(200,155,42,0.4)',
            color: '#e8b93a',
            padding: '0.3rem 1rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}>
            ✦ CAJA RURAL DE AHORRO Y CRÉDITO
          </div>

          <h1 className="fade-up-2" style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Financiamiento que{' '}
            <span style={{ color: '#e8b93a', fontStyle: 'italic' }}>crece</span>
            {' '}con el campo peruano
          </h1>

          <p className="fade-up-3" style={{
            fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '560px',
          }}>
            Desde 1995 apoyamos al productor rural, al microempresario y a las
            familias andinas con créditos justos y ahorros seguros.
          </p>

          <div className="fade-up-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
              style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
            >
              🏦 Ingresar a mi cuenta
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
            >
              Ver productos ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ── */}
      <section style={{
        background: 'white',
        padding: '3rem 2rem',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center',
        }}>
          {estadisticas.map((e) => (
            <div key={e.etiqueta}>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '2.5rem', fontWeight: 700,
                color: '#1a7a3c', lineHeight: 1,
              }}>{e.valor}</div>
              <div style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.4rem', fontWeight: 500 }}>
                {e.etiqueta}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTOS ── */}
      <section id="productos" style={{ padding: '5rem 2rem', background: '#f4f6f4' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#1a7a3c', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              NUESTROS PRODUCTOS
            </p>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '2.2rem', fontWeight: 700,
              color: '#1f2937', marginTop: '0.5rem',
            }}>
              Diseñados para el Perú real
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {productos.map((p) => (
              <div key={p.titulo}
                style={{
                  background: 'white', borderRadius: '16px',
                  padding: '1.8rem', cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  borderTop: '4px solid #1a7a3c',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,122,60,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{p.icon}</div>
                <h3 style={{ color: '#135e2d', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                  {p.titulo}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {p.desc}
                </p>
                <span style={{
                  display: 'inline-block',
                  background: '#f0faf3', color: '#1a7a3c',
                  fontSize: '0.78rem', fontWeight: 700,
                  padding: '0.3rem 0.8rem', borderRadius: '50px',
                }}>
                  {p.tasa}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANCA DIGITAL ── */}
      <section style={{
        background: 'linear-gradient(135deg, #135e2d, #1a7a3c)',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200,155,42,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(200,155,42,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontFamily: "'Fraunces', serif",
            color: 'white', fontSize: '2.2rem',
            fontWeight: 700, marginBottom: '1rem',
          }}>
            Tu banca, en cualquier lugar de los Andes
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Consulta saldos, transfiere fondos y revisa tus créditos las 24 horas del día.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
            style={{ fontSize: '1.05rem', padding: '0.9rem 2.4rem', animation: 'pulse-ring 2.5s infinite' }}
          >
            🔐 Acceder a Banca por Internet
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#0d2b15', color: 'rgba(255,255,255,0.5)',
        padding: '2rem', textAlign: 'center', fontSize: '0.82rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <LogoIcon size={22} color="rgba(255,255,255,0.6)" />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>CRAC Los Andes S.A.</span>
        </div>
        Supervisada por la SBS &nbsp;|&nbsp; Asegurada por el FONDO DE SEGURO DE DEPÓSITOS &nbsp;|&nbsp; 0800-00-789
        <div style={{ marginTop: '0.8rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
          © 2026 CRAC Los Andes. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
