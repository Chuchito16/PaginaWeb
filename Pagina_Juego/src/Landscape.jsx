// Ilustración vectorial original. Representación artística, no cartografía.
export default function Landscape({ className = '' }) {
  return <svg className={className} viewBox="0 0 1000 660" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración de Cali con montañas verdes, el río, casas y una representación de Cristo Rey">
    <defs>
      <linearGradient id="sky" x2="0" y2="1"><stop stopColor="#bcdad9"/><stop offset="1" stopColor="#f6e9c9"/></linearGradient>
      <linearGradient id="hill" x2="0.5" y2="1"><stop stopColor="#377c66"/><stop offset="1" stopColor="#184f44"/></linearGradient>
      <pattern id="windows" width="25" height="28" patternUnits="userSpaceOnUse"><rect x="8" y="9" width="7" height="11" fill="#577c71" opacity=".5"/></pattern>
      <filter id="grain"><feTurbulence baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".05"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
    </defs>
    <g filter="url(#grain)">
      <path fill="url(#sky)" d="M0 0h1000v660H0z"/>
      <circle cx="762" cy="133" r="67" fill="#ffecc0"/>
      <g fill="none" stroke="#f9f4e7" strokeWidth="3" opacity=".5"><path d="M45 88h215m-140 14h198M485 64h97m268 168h137"/></g>
      <path d="m0 310 103-84 80 33L353 103l154 168 90-60 196 90 96-93 111 68v384H0Z" fill="#86aaa0"/>
      <path d="m0 380 135-98 78 35 111-91 99 100 91-19 149 74 140-58 197 70v267H0Z" fill="#5c907d"/>
      <path d="M0 397q130-125 272-65t199 96q-30 48-154 124L0 596Z" fill="url(#hill)"/>
      <path d="M0 476q145-32 232-97" fill="none" stroke="#acc099" strokeWidth="8" opacity=".6"/>
      <g fill="#f6ebcf" transform="translate(269 267)"><path d="M-5 0h10l4 19 36 4v7L8 27l4 51h-24l4-51-37 3v-7l36-4Z"/><circle cy="-10" r="8"/><path d="M-19 78h38v8h-38zM-26 86h52v8h-52z"/></g>
      <path d="M1000 340q-160 24-286 118t-328 63Q281 526 255 660h745Z" fill="#a9baa2"/>
      <path d="M1000 424q-173 34-256 70T467 559q-106 44-100 101h169q-60-53 44-71t220-56q83-61 200-59Z" fill="#86c2c4"/>
      <path d="M1000 444q-136 11-247 68t-235 63q-50 12-62 38" fill="none" stroke="#d7eeee" strokeWidth="4"/>
      <g stroke="#bf8e61" strokeWidth="1.5">
        <path d="M502 373h74v108h-74z" fill="#f1d7ab"/><path d="M498 373h82l-41-24z" fill="#b76b49"/>
        <path d="M590 399h53v88h-53z" fill="#edb887"/><path d="M585 399h64l-32-24z" fill="#bb7150"/>
        <path d="M662 365h52v101h-52z" fill="#f1e6c5"/><path d="M668 358h40v7h-40z" fill="#9c6350"/>
        <path d="M733 388h45v58h-45z" fill="#dfba87"/><path d="M729 388h53l-26-20z" fill="#c57850"/>
        <path d="M793 350h72v91h-72z" fill="#e8c29d"/><path d="M788 350h82l-41-24z" fill="#b76b49"/>
        <path d="M892 355h42v70h-42z" fill="#eddfb9"/>
      </g>
      <g fill="url(#windows)"><path d="M509 383h57v90h-57zM595 405h42v74h-42zM667 373h42v83h-42zM799 358h58v76h-58zM897 362h31v59h-31z"/></g>
      <g transform="translate(372 396)"><path d="M0 21h92v86H0Z" fill="#edddbd"/><path d="m-9 23 55-39 55 39z" fill="#b96748"/><path d="M36 107V65a11 11 0 0 1 22 0v42" fill="#285c52"/><path d="M10-33h19v73H10z" fill="#eee2c5"/><path d="m7-33 12-20 13 20z" fill="#bd754f"/><path d="M19-62v15m-6-10h12" stroke="#425e52" strokeWidth="3"/><path d="M15-12v-9a5 5 0 0 1 9 0v9z" fill="#426a5c"/></g>
      <g fill="#366e52"><ellipse cx="324" cy="478" rx="29" ry="36"/><ellipse cx="710" cy="480" rx="19" ry="24"/><ellipse cx="898" cy="442" rx="20" ry="26"/></g>
      <path d="M0 582q176-106 339-10l55 88H0Z" fill="#245e48"/>
      <path d="M610 660q213-157 390-97v97Z" fill="#447b53"/>
      <g fill="#ecbb83" stroke="#986340" strokeWidth="2"><path d="M86 525h91v72H86z"/><path d="m76 525 53-40 59 40z" fill="#b96748"/><path d="M195 554h75v58h-75z"/><path d="m187 554 47-36 46 36z" fill="#d48b53"/></g>
      <g fill="#28584c"><path d="M119 562h22v35h-22zM218 579h19v33h-19z"/><path d="M97 546h12v16H97zM150 546h12v16h-12z"/></g>
      <g fill="none" stroke="#193e35" strokeLinecap="round"><path d="M946 638q-36-94-5-170" strokeWidth="11"/><path d="M941 476q-25-44-85-21m85 21q10-60 61-71m-61 71q40-28 80 3m-80-3q-8-50-51-59" strokeWidth="16"/><path d="M37 660q31-49 14-110" strokeWidth="8"/><path d="M50 553q-21-36-60-20m60 20q34-27 59-12m-59 12q12-47 47-52" strokeWidth="12"/></g>
      <g fill="none" stroke="#365e56" strokeWidth="2.5"><path d="M536 153q9-9 18 0 9-9 18 0m48 34q7-7 14 0 7-7 14 0"/></g>
    </g>
  </svg>;
}
