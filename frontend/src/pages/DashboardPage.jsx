import { useNavigate } from 'react-router-dom';
import { obtenerSesion, cerrarSesion } from '../services/authService';
import { useState } from 'react';

function LogoIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34 L14 14 L20 22 L26 10 L36 34 Z" fill="white" opacity="0.9"/>
      <circle cx="26" cy="10" r="2.5" fill="#c89b2a"/>
    </svg>
  );
}

const tarjetas = [
  { titulo: 'Cuenta Ahorros Andina', valor: 'S/ 3,450.00', color: '#1a7a3c', icon: '💰', sub: 'Saldo disponible' },
  { titulo: 'Crédito MYPE Activo',   valor: 'S/ 8,000.00', color: '#c89b2a', icon: '📋', sub: 'Saldo pendiente' },
  { titulo: 'Próxima cuota',          valor: '15/06/2026',  color: '#e05d2d', icon: '📅', sub: 'Fecha de pago' },
  { titulo: 'Puntos Los Andes',       valor: '1,240 pts',   color: '#5b4fcf', icon: '⭐', sub: 'Puntos acumulados' },
];

const movimientos = [
  { desc: 'Depósito en efectivo',    monto: '+S/ 500.00', fecha: '28 May 2026', tipo: 'ingreso' },
  { desc: 'Pago cuota crédito MYPE', monto: '-S/ 320.00', fecha: '25 May 2026', tipo: 'egreso' },
  { desc: 'Transferencia recibida',  monto: '+S/ 150.00', fecha: '22 May 2026', tipo: 'ingreso' },
  { desc: 'Pago de servicios',       monto: '-S/ 85.00',  fecha: '20 May 2026', tipo: 'egreso' },
  { desc: 'Depósito programado',     monto: '+S/ 200.00', fecha: '18 May 2026', tipo: 'ingreso' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const sesion = obtenerSesion();
  const [seccionActiva, setSeccionActiva] = useState('dashboard');

  function handleLogout() {
    cerrarSesion();
    navigate('/');
  }

  const navItems = [
    { id: 'dashboard', label: 'Mi Panel', icon: '🏠' },
    { id: 'ahorros',   label: 'Ahorros',  icon: '💰' },
    { id: 'creditos',  label: 'Créditos', icon: '📋' },
    { id: 'transferencias', label: 'Transferencias', icon: '↔️' },
    { id: 'perfil',    label: 'Mi Perfil', icon: '👤' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f4', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{
        background: 'linear-gradient(90deg, #0d4a22, #1a7a3c)',
        padding: '0 2rem', height: '64px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <LogoIcon size={28} />
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.1 }}>CRAC Los Andes</div>
            <div style={{ color: '#c89b2a', fontSize: '0.6rem', letterSpacing: '0.1em', fontWeight: 600 }}>MI CUENTA</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>Bienvenido,</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem' }}>
              {sesion?.usuario?.nombre || sesion?.usuario?.email}
            </div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#c89b2a', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '1rem',
          }}>
            {(sesion?.usuario?.email || 'C')[0].toUpperCase()}
          </div>
          <button onClick={handleLogout} style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', padding: '0.4rem 1rem',
            borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.82rem', fontWeight: 600,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR */}
        <aside style={{
          width: '220px', background: 'white',
          boxShadow: '2px 0 12px rgba(0,0,0,0.05)',
          padding: '1.5rem 0',
          display: 'flex', flexDirection: 'column', gap: '0.3rem',
        }}>
          {navItems.map(item => (
            <button key={item.id}
              onClick={() => setSeccionActiva(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                padding: '0.75rem 1.5rem',
                background: seccionActiva === item.id ? '#f0faf3' : 'transparent',
                border: 'none', borderLeft: seccionActiva === item.id ? '3px solid #1a7a3c' : '3px solid transparent',
                cursor: 'pointer', textAlign: 'left', width: '100%',
                color: seccionActiva === item.id ? '#1a7a3c' : '#6b7280',
                fontWeight: seccionActiva === item.id ? 700 : 500,
                fontSize: '0.9rem',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#1f2937', marginBottom: '1.5rem' }}>
            {navItems.find(n => n.id === seccionActiva)?.icon}{' '}
            {navItems.find(n => n.id === seccionActiva)?.label}
          </h2>

          {seccionActiva === 'dashboard' && (
            <>
              {/* Tarjetas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '1.2rem', marginBottom: '2rem',
              }}>
                {tarjetas.map(t => (
                  <div key={t.titulo} style={{
                    background: 'white', borderRadius: '14px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    borderLeft: `4px solid ${t.color}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.3rem' }}>
                          {t.sub}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 600, marginBottom: '0.5rem' }}>
                          {t.titulo}
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: t.color }}>{t.valor}</p>
                      </div>
                      <span style={{ fontSize: '1.8rem' }}>{t.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Últimos movimientos */}
              <div style={{ background: 'white', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1.2rem', color: '#1f2937' }}>
                  📊 Últimos movimientos
                </h3>
                {movimientos.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.9rem 0',
                    borderBottom: i < movimientos.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: m.tipo === 'ingreso' ? '#f0faf3' : '#fef2f2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem',
                      }}>
                        {m.tipo === 'ingreso' ? '⬆️' : '⬇️'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1f2937' }}>{m.desc}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{m.fecha}</div>
                      </div>
                    </div>
                    <div style={{
                      fontWeight: 700, fontSize: '0.95rem',
                      color: m.tipo === 'ingreso' ? '#1a7a3c' : '#dc2626',
                    }}>
                      {m.monto}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {seccionActiva !== 'dashboard' && (
            <div style={{
              background: 'white', borderRadius: '14px',
              padding: '3rem', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              color: '#9ca3af',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
              <h3 style={{ color: '#374151', fontWeight: 700, marginBottom: '0.5rem' }}>
                Módulo en desarrollo
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                El módulo de <strong style={{ color: '#1a7a3c' }}>
                  {navItems.find(n => n.id === seccionActiva)?.label}
                </strong> se conectará con el backend en la próxima sesión.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
