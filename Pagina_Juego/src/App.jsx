import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Compass, Earth, Flame, Gamepad2, HeartHandshake, House, MapPin, Menu, Mountain, MousePointer2, Waves, X } from 'lucide-react';
import Landscape from './Landscape.jsx';
import UnityPlayer from './UnityPlayer.jsx';
import { chapters, sources } from './content.js';

const icons = { earth: Earth, waves: Waves, mountain: Mountain, flame: Flame };
const stages = [{id:'before', label:'Antes', detail:'Conocer y prepararnos'}, {id:'during',label:'Durante',detail:'Observar y decidir'}, {id:'after',label:'Después',detail:'Cuidar y reconstruir'}];
export default function App() {
  const [menu, setMenu] = useState(false);
  const [chapterId, setChapterId] = useState(chapters[0].id);
  const [stage, setStage] = useState('before');
  const chapter = chapters.find(item => item.id === chapterId);
  const Icon = icons[chapter.icon];
  function navigate() { setMenu(false); }
  function selectChapter(id) { setChapterId(id); }
  function moveTab(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
  }

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="utility-bar"><div className="section-shell"><span>UNIVERSIDAD AUTÓNOMA DE OCCIDENTE</span><nav aria-label="Enlaces de utilidad"><a href="#proyecto">Proyecto académico</a><a href="#fuentes">Fuentes de consulta</a><a href="#preguntas">Preguntas frecuentes</a></nav></div></div>
    <header className="header">
      <a href="#inicio" className="brand" aria-label="Nuestra casa compartida, inicio"><span className="brand-icon"><House size={24} strokeWidth={1.6}/></span><span>Nuestra casa<br/><strong>compartida<span className="brand-dot">.</span></strong></span></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="navigation" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}>{menu ? <X/> : <Menu/>}</button>
      <nav id="navigation" className={menu ? 'navigation open' : 'navigation'} aria-label="Navegación principal">
        <a href="#historia" onClick={navigate}>La historia <ChevronDown size={12}/></a><a href="#capitulos" onClick={navigate}>Los capítulos <ChevronDown size={12}/></a><a href="#proyecto" onClick={navigate}>El proyecto <ChevronDown size={12}/></a><a href="#jugar" onClick={navigate} className="nav-play">Explorar el juego <ArrowUpRight size={16}/></a>
      </nav>
    </header>
    <main id="contenido">
      <section id="inicio" className="hero">
        <div className="hero-visual" aria-hidden="true"><Landscape/></div>
        <div className="hero-shade" aria-hidden="true"/>
        <div className="hero-breadcrumb"><House size={15}/><span>Inicio</span><span>›</span><span>Novela gráfica interactiva</span></div>
        <div className="hero-copy section-shell">
          <span className="eyebrow">CONOCE TU TERRITORIO. APRENDE A CUIDARLO.</span>
          <h1>Nuestra casa<br/>compartida</h1>
          <div className="hero-title-rule"/>
          <p className="hero-subtitle">Cali frente a los<br/>desastres naturales</p>
          <a href="#jugar" className="button primary">Explorar el juego <ArrowRight size={19}/></a>
        </div>
        <span className="hero-credit">Santiago de Cali · Ilustración del territorio</span>
      </section>
      <div className="welcome section-shell"><p>Una historia para <strong>conocer Cali, tomar decisiones y aprender a cuidarnos.</strong><br/>Explora los desafíos de nuestro territorio a través de una novela gráfica interactiva.</p></div>
      <nav className="quick-links section-shell" aria-label="Accesos al proyecto">
        <a href="#jugar"><Gamepad2 size={23}/><span>Juega la experiencia</span><span className="quick-arrow"><ArrowRight size={19}/></span></a>
        <a href="#capitulos"><BookOpen size={23}/><span>Descubre los capítulos</span><span className="quick-arrow"><ArrowRight size={19}/></span></a>
        <a href="#aprender"><HeartHandshake size={23}/><span>Aprende a prepararte</span><span className="quick-arrow"><ArrowRight size={19}/></span></a>
      </nav>

      <section id="historia" className="story-section section-shell section-space"><div><span className="eyebrow">01 / LA HISTORIA</span><h2>Un lugar que compartimos.<br/><em>Una historia que decidimos.</em></h2></div><div className="story-copy"><p>Entre los Farallones y el valle del río Cauca hay una ciudad llena de vida. Sus ríos, laderas y barrios son el escenario de esta novela gráfica.</p><p><strong>Nuestra casa compartida</strong> propone aprender sobre los fenómenos naturales a través de personajes, conversaciones y decisiones. Una invitación a conocer Cali y a pensar cómo nos cuidamos en comunidad.</p><span className="small-note">Una propuesta educativa de Arquitectura de Sistemas Multimedia · UAO</span></div></section>

      <section id="capitulos" className="chapters-section section-space"><div className="section-shell"><div className="section-heading"><div><span className="eyebrow">02 / EXPLORA LOS CAPÍTULOS</span><h2>Cuatro desafíos.<br/><em>Una misma ciudad.</em></h2></div><p>Cada fenómeno abre una conversación.<br/>Selecciona un capítulo para conocer su propuesta.</p></div>
        <div className="chapter-tabs" role="tablist" onKeyDown={moveTab} aria-label="Capítulos de la novela">{chapters.map((item) => {const ItemIcon=icons[item.icon]; return <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={chapterId===item.id} aria-controls="chapter-panel" className={`chapter-tab ${item.color} ${chapterId===item.id?'selected':''}`} onClick={()=>selectChapter(item.id)}><span className="chapter-tab-top"><ItemIcon size={25} strokeWidth={1.4}/><span>{item.number}</span></span><strong>{item.phenomenon}</strong><span className="chapter-summary">{item.description}</span><span className="chapter-tab-bottom">{item.name}<ArrowUpRight size={16}/></span></button>;})}</div>
        <div className={`chapter-panel ${chapter.color}`} id="chapter-panel" role="tabpanel" aria-labelledby={`tab-${chapter.id}`}><div className="chapter-art" aria-hidden="true"><span className="chapter-giant">{chapter.number}</span><Icon size={110} strokeWidth={0.8}/><span>{chapter.phenomenon.toUpperCase()}</span></div><div className="chapter-detail"><span className="eyebrow">CAPÍTULO {chapter.number} <span className="dot-separator">·</span> {chapter.origin}</span><h3>{chapter.name}</h3><p>{chapter.description}</p><span className="chapter-zone"><MapPin size={16}/>{chapter.zone}</span><div className="challenge"><MousePointer2 size={17}/><span><strong>Tu desafío en la historia</strong>{chapter.challenge}</span></div></div></div>
        <p className="chapter-note">Capítulos propuestos para el juego en desarrollo. Las zonas son referencias narrativas; no representan un mapa oficial de amenaza.</p>
      </div></section>

      <section id="aprender" className="learning-section section-shell section-space"><div className="learning-title"><span className="eyebrow">APRENDER PARA LA VIDA</span><h2>Cada decisión<br/><em>es un aprendizaje.</em></h2><p>La experiencia recorre tres momentos de cada fenómeno. Explora el enfoque de <strong>{chapter.phenomenon.toLowerCase()}</strong>.</p></div><div className="learning-content"><div className="stage-tabs" role="tablist" onKeyDown={moveTab} aria-label="Momentos del aprendizaje">{stages.map((item,i)=><button key={item.id} role="tab" id={`stage-${item.id}`} aria-selected={stage===item.id} aria-controls="stage-panel" onClick={()=>setStage(item.id)} className={stage===item.id?'active':''}><span>0{i+1}</span>{item.label}</button>)}</div><div id="stage-panel" role="tabpanel" aria-labelledby={`stage-${stage}`} className="stage-panel"><span className="check-icon"><Check size={20}/></span><div><h3>{stages.find(item=>item.id===stage).detail}</h3><p>{chapter[stage]}</p><span className="small-note">A través de diálogos y puzzles dentro de la novela.</span></div></div></div></section>

      <section id="jugar" className="game-section section-shell section-space"><div className="section-heading"><div><span className="eyebrow">03 / VIVE LA EXPERIENCIA</span><h2>Tu siguiente decisión<br/><em>empieza aquí.</em></h2></div><div className="web-label"><Gamepad2 size={20}/><span>Desde tu navegador<br/><strong>Sin instalar el juego</strong></span></div></div><UnityPlayer/><div className="game-footnote"><span><BookOpen size={16}/> Explora los capítulos mientras preparamos el juego.</span><span>Para la experiencia de juego, recomendamos un computador.</span></div></section>

      <section id="proyecto" className="project-section section-space"><div className="section-shell project-grid"><div><span className="eyebrow light">04 / DETRÁS DE LA HISTORIA</span><h2>Diseñado para aprender.<br/><em>Creado para compartir.</em></h2><p>Un proyecto académico de la Universidad Autónoma de Occidente que conecta narrativa, interacción y conocimiento del territorio.</p><span className="project-course">ARQUITECTURA DE SISTEMAS MULTIMEDIA</span></div><div className="project-details"><div><span>01</span><div><h3>Narrativa y decisiones</h3><p>Personajes originales, conversaciones y puzzles para aprender desde la experiencia.</p></div></div><div><span>02</span><div><h3>Un mapa como punto de partida</h3><p>La propuesta del juego conecta zonas de Cali con los cuatro capítulos de la historia.</p></div></div><div><span>03</span><div><h3>Multimedia con propósito</h3><p>Unity 2D reúne ilustraciones, audio y cinemáticas en una experiencia para la web.</p></div></div></div></div></section>

      <section id="preguntas" className="faq-section section-shell section-space">
        <div className="section-heading"><div><span className="eyebrow">ANTES DE COMENZAR</span><h2>Preguntas frecuentes</h2></div></div>
        <div className="faq-grid">
          <article className="faq-card"><h3>¿Qué es Nuestra casa compartida?</h3><p>Es un proyecto de novela gráfica interactiva sobre Cali. Propone aprender acerca de cuatro fenómenos naturales mediante personajes, conversaciones y decisiones.</p></article>
          <article className="faq-card"><h3>¿El juego ya está disponible?</h3><p>Consulta la disponibilidad en la sección de juego. Allí podrás iniciar la experiencia cuando su versión web esté disponible.</p><a href="#jugar">Ver disponibilidad <ArrowUpRight size={16}/></a></article>
          <article className="faq-card"><h3>¿Tengo que instalar algo?</h3><p>La versión web se ejecutará desde el navegador. Para jugar recomendamos un computador; la compatibilidad final dependerá de la compilación de Unity.</p></article>
          <article className="faq-card"><h3>¿Qué voy a explorar?</h3><p>Terremotos, inundaciones, deslizamientos e incendios forestales, con actividades sobre el antes, durante y después de cada fenómeno.</p><a href="#capitulos">Conocer los capítulos <ArrowUpRight size={16}/></a></article>
        </div>
      </section>

      <section id="fuentes" className="sources-section section-shell section-space"><div className="section-heading"><div><span className="eyebrow">SIGUE EXPLORANDO</span><h2>El conocimiento también<br/><em>se construye con fuentes.</em></h2></div><p>Consulta información oficial sobre el territorio<br/>y la gestión del riesgo.</p></div><div className="source-links">{sources.map(source=><a key={source.name} href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><strong>{source.name}</strong><ArrowUpRight size={19}/></a>)}</div><p className="source-note">Este es un proyecto educativo en desarrollo. Para alertas, rutas de evacuación e indicaciones ante una emergencia, consulta a las autoridades locales.</p></section>
    </main>
    <footer className="footer section-shell"><a className="brand" href="#inicio"><span className="brand-icon"><House size={21}/></span><span>Nuestra casa<br/><strong>compartida.</strong></span></a><p>Proyecto académico · Arquitectura de Sistemas Multimedia<br/>Universidad Autónoma de Occidente · Cali, Colombia</p><a href="#inicio">Volver arriba <ArrowRight className="rotate-up" size={16}/></a></footer><div className="flag-stripe" aria-hidden="true"/>
  </>;
}
