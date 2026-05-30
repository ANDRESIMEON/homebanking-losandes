import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, guardarSesion } from '../services/authService';

function LogoIcon({ size = 32, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34 L14 14 L20 22 L26 10 L36 34 Z" fill={color} opacity="0.9"/>
      <circle cx="26" cy="10" r="2.5" fill="#c89b2a"/>
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPass, setMostrarPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setCargando(true);
    try {
      const data = await login(email, password);
      guardarSesion(data.data.token, data.data.usuario);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setCargando(false);
    }
  }

  const inputStyle = {
    display: 'block', width: '100%', padding: '0.8rem 1rem',
    margin: '0.4rem 0 1.2rem',
    border: '1.5px solid #d1d5db', borderRadius: '10px',
    fontSize: '0.97rem', fontFamily: 'Plus Jakarta Sans, sans-serif',
    outline: 'none', transition: 'border-color 0.2s',
    background: '#fafafa',
  };

  const labelStyle = { fontWeight: 600, fontSize: '0.88rem', color: '#374151' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Panel izquierdo — solo desktop */}
      <div style={{
        flex: 1, display: 'none',
        background: 'linear-gradient(145deg, #0d4a22, #1a7a3c)',
        padding: '3rem', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
        ...(window.innerWidth > 768 ? { display: 'flex' } : {}),
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07 }}>
          <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path d="M0 600 L80 200 L150 350 L220 100 L320 300 L400 80 L400 600Z" fill="white"/>
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: 'pointer' }}
               onClick={() => navigate('/')}>
            <LogoIcon size={38} />
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>CRAC Los Andes</div>
              <div style={{ color: '#c89b2a', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600 }}>BANCA RURAL</div>
            </div>
          </div>
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              color: 'white', fontSize: '2.2rem', fontWeight: 700,
              lineHeight: 1.2, marginBottom: '1rem',
            }}>
              Banca segura,<br/>
              <span style={{ color: '#e8b93a', fontStyle: 'italic' }}>donde estés</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Accede a tus cuentas, revisa tus créditos y realiza transferencias desde cualquier lugar del Perú.
            </p>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          {['Cifrado SSL de 256 bits', 'Protegido por la SBS', 'Sesión segura con token JWT'].map(txt => (
            <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#c89b2a' }}>✓</span> {txt}
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div style={{
        width: '100%', maxWidth: '480px',
        display: 'flex', flexDirection: 'column',
        background: 'white',
        justifyContent: 'center', padding: '3rem 2.5rem',
      }}>
        {/* Mobile logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', cursor: 'pointer' }}
             onClick={() => navigate('/')}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: '#1a7a3c', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LogoIcon size={26} />
          </div>
          <span style={{ fontWeight: 800, color: '#135e2d' }}>CRAC Los Andes</span>
        </div>

        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#1f2937', marginBottom: '0.3rem' }}>
          Banca por Internet
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Ingresa con tus credenciales registradas
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Correo electrónico</label>
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#1a7a3c'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
          />

          <label style={labelStyle}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={mostrarPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ ...inputStyle, paddingRight: '3rem' }}
              onFocus={e => e.target.style.borderColor = '#1a7a3c'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />
            <button type="button" onClick={() => setMostrarPass(!mostrarPass)}
              style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-75%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem',
              }}>
              {mostrarPass ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <p className="error-msg">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-verde"
            disabled={cargando}
            style={{
              width: '100%', marginTop: '1.5rem',
              opacity: cargando ? 0.7 : 1,
              justifyContent: 'center', borderRadius: '10px',
              padding: '0.9rem',
            }}
          >
            {cargando ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
                Verificando...
              </span>
            ) : '🔐 Ingresar a mi cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: '#9ca3af' }}>
          ¿Problemas para ingresar? Llama al{' '}
          <strong style={{ color: '#1a7a3c' }}>0800-00-789</strong>
        </p>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}
