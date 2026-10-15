import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Gamepad2, LoaderCircle, Maximize2, RefreshCw, X } from 'lucide-react';

export default function UnityPlayer() {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState('checking');
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState('');
  const container = useRef(null);
  const base = new URL(import.meta.env.BASE_URL, document.baseURI);

  async function check(signal) {
    setStatus('checking');
    try {
      const response = await fetch(new URL('game-config.json', base), { cache: 'no-store', signal });
      if (!response.ok) throw new Error('config');
      const next = await response.json();
      if (!next.enabled) { setStatus('development'); return; }
      const url = new URL(next.url, base);
      // Solo compilaciones locales: evita ejecutar URLs arbitrarias desde la configuración.
      if (url.origin !== location.origin || !url.pathname.startsWith(new URL('unity/', base).pathname) || !url.pathname.endsWith('.html')) throw new Error('url');
      const build = await fetch(url, { cache: 'no-store', signal });
      const html = await build.text();
      if (!build.ok || !html.includes('createUnityInstance')) throw new Error('build');
      setConfig({ ...next, url: url.href });
      setStatus('ready');
    } catch (error) { if (error.name !== 'AbortError') setStatus('error'); }
  }
  useEffect(() => {
    const controller = new AbortController();
    check(controller.signal);
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!playing || loaded) return;
    const timeout = setTimeout(() => setNotice('La carga está tardando. Puedes abrir el juego en otra pestaña o volver a intentarlo.'), 30000);
    return () => clearTimeout(timeout);
  }, [playing, loaded]);

  async function fullscreen() {
    try {
      if (!container.current?.requestFullscreen) throw new Error('unsupported');
      await container.current.requestFullscreen();
    } catch { setNotice('La pantalla completa no está disponible en este navegador. Puedes abrir el juego en otra pestaña.'); }
  }
  return <div className="player" ref={container}>
    <div className="player-toolbar"><span><span className={`status-dot ${status === 'ready' ? 'ready' : ''}`} />{status === 'ready' ? 'LISTO PARA EXPLORAR' : 'EXPERIENCIA INTERACTIVA'}</span><span className="player-format">NOVELA GRÁFICA · UNITY</span>
      {playing && <div className="player-actions"><button onClick={fullscreen} aria-label="Pantalla completa"><Maximize2 size={18}/></button><button onClick={() => {setPlaying(false); setLoaded(false); setNotice('');}} aria-label="Cerrar juego"><X size={18}/></button></div>}
    </div>
    {playing ? <div className="game-frame">
      {!loaded && <p className="frame-loading" role="status"><LoaderCircle className="spin"/> Abriendo el juego…</p>}
      <iframe src={config.url} title={config.title || 'Nuestra casa compartida'} allow="fullscreen; autoplay; gamepad" allowFullScreen onLoad={() => { setLoaded(true); setNotice(''); }} onError={() => setNotice('No se pudo abrir el juego. Intenta abrirlo en otra pestaña.')} />
    </div> : <div className="player-cover">
      <div className="cover-rings" aria-hidden="true"/><div className="game-emblem"><Gamepad2 size={38} strokeWidth={1.3}/></div>
      <span className="eyebrow light">TU CIUDAD. TUS DECISIONES.</span>
      <h3>La historia comienza contigo.</h3>
      <p>{status === 'ready' ? 'Entra a la novela y descubre Cali desde una nueva perspectiva.' : status === 'error' ? 'No pudimos verificar la disponibilidad del juego. Inténtalo de nuevo en un momento.' : status === 'checking' ? 'Consultando la disponibilidad de la experiencia…' : 'Estamos construyendo una experiencia para conocer nuestro territorio y aprender a cuidarnos.'}</p>
      {status === 'ready' ? <button className="button cream" onClick={() => {setPlaying(true); setLoaded(false); setNotice('');}}>Comenzar el juego <ArrowUpRight size={18}/></button> : <span className="development-badge">{status === 'checking' ? <LoaderCircle className="spin" size={15}/> : <span className="status-dot"/>}{status === 'error' ? 'Juego no disponible' : status === 'checking' ? 'Comprobando disponibilidad' : 'Juego en desarrollo'}</span>}
      <button className="text-button player-refresh" disabled={status === 'checking'} onClick={() => check()}><RefreshCw size={13}/> Comprobar disponibilidad</button>
    </div>}
    <div className="player-bottom"><span>{playing ? 'La carga de los recursos continúa dentro del juego.' : 'Una experiencia para aprender, decidir y cuidar.'}</span>{playing && <a href={config.url} target="_blank" rel="noreferrer">Abrir en otra pestaña <ArrowUpRight size={14}/></a>}</div>
    {notice && <p className="player-notice" role="status">{notice}</p>}
  </div>;
}
