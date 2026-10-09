import { useEffect, useRef, useState } from 'react';
import { Camera, Check, Copy, Download, Dices, Grid2X2, Heart, Link as LinkIcon, MessageSquare, Redo2, Undo2, X } from 'lucide-react';
import { Avatar, Photobooth } from './Avatar';
import { accessories, animePresets, backdrops, blushes, classicAvatar, frames, hairNames, hairs, initialAvatar, looks, outfits, outfitColors, randomAvatar, skins, type AvatarState } from './data';

type Tab = 'Head'|'Hair'|'Outfit'|'Extras'|'Backdrop'|'Frame';
const tabs: Tab[]=['Head','Hair','Outfit','Extras','Backdrop','Frame'];
const validKeys = Object.keys(initialAvatar) as (keyof AvatarState)[];

function readSharedAvatar(): AvatarState {
  try {
    const raw=new URLSearchParams(location.search).get('v');
    if(!raw) return initialAvatar;
    const parsed=JSON.parse(atob(raw.replace(/-/g,'+').replace(/_/g,'/'))) as Record<string,unknown>;
    const next={...initialAvatar};
    for(const key of validKeys) if(typeof parsed[key]===typeof initialAvatar[key]) (next as unknown as Record<string,unknown>)[key]=parsed[key];
    if(!Object.prototype.hasOwnProperty.call(parsed,'anime')) next.anime='';
    return next;
  } catch { return initialAvatar; }
}

function shareUrl(avatar:AvatarState) {
  const encoded=btoa(JSON.stringify(avatar)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const url=new URL(location.href); url.searchParams.set('v',encoded); return url.toString();
}

function App() {
  const [avatar,setAvatar]=useState<AvatarState>(readSharedAvatar);
  const [history,setHistory]=useState<AvatarState[]>([]);
  const [future,setFuture]=useState<AvatarState[]>([]);
  const [tab,setTab]=useState<Tab>('Head');
  const [photobooth,setPhotobooth]=useState(false);
  const [looksOpen,setLooksOpen]=useState(false);
  const [animeOpen,setAnimeOpen]=useState(false);
  const [toast,setToast]=useState('');
  const svgWrap=useRef<HTMLDivElement>(null);
  const animeMenu=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!toast) return;
    const timer=window.setTimeout(()=>setToast(''),3200);
    return ()=>window.clearTimeout(timer);
  },[toast]);

  useEffect(()=>{
    if(!animeOpen) return;
    const onOutside=(event:PointerEvent)=>{if(!animeMenu.current?.contains(event.target as Node)) setAnimeOpen(false)};
    const onEscape=(event:KeyboardEvent)=>{if(event.key==='Escape') setAnimeOpen(false)};
    document.addEventListener('pointerdown',onOutside);
    document.addEventListener('keydown',onEscape);
    return ()=>{document.removeEventListener('pointerdown',onOutside);document.removeEventListener('keydown',onEscape)};
  },[animeOpen]);

  function change(patch:Partial<AvatarState>) {
    const next={...avatar,...patch};
    if(JSON.stringify(next)===JSON.stringify(avatar)) return;
    setHistory(previous=>[...previous.slice(-49),avatar]); setFuture([]); setAvatar(next);
  }
  function undo() {
    if(!history.length) return;
    setFuture(previous=>[avatar,...previous]); setAvatar(history.at(-1)!); setHistory(previous=>previous.slice(0,-1));
  }
  function redo() {
    if(!future.length) return;
    setHistory(previous=>[...previous,avatar]); setAvatar(future[0]); setFuture(previous=>previous.slice(1));
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(shareUrl(avatar)); setToast('Link copied — share your bot!'); }
    catch { setToast('Copy unavailable in this browser.'); }
  }
  function currentSvg() {
    const svg=svgWrap.current?.querySelector('svg');
    if(!svg) throw new Error('Preview is not ready');
    const clone=svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
    clone.setAttribute('width','1024'); clone.setAttribute('height','1024');
    if(!photobooth) clone.setAttribute('viewBox','0 0 512 512');
    return new XMLSerializer().serializeToString(clone);
  }
  function saveBlob(blob:Blob,filename:string) {
    const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; document.body.append(a); a.click(); a.remove(); window.setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  async function asPng(size:number) {
    const svg=new Blob([currentSvg()],{type:'image/svg+xml;charset=utf-8'});
    const url=URL.createObjectURL(svg);
    try {
      const img=new Image(); img.src=url; await img.decode();
      const canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
      const ctx=canvas.getContext('2d'); if(!ctx) throw new Error('Canvas unavailable');
      ctx.drawImage(img,0,0,size,size);
      return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG export failed')),'image/png'));
    } finally { URL.revokeObjectURL(url); }
  }
  async function download(kind:'png'|'svg',size=1024) {
    try {
      const name=photobooth?'bot-pfp-photobooth':'bot-pfp';
      if(kind==='svg') saveBlob(new Blob([currentSvg()],{type:'image/svg+xml;charset=utf-8'}),`${name}.svg`);
      else saveBlob(await asPng(size),`${name}-${size}.png`);
      setToast(`${kind.toUpperCase()} downloaded`);
    } catch { setToast('Download failed. Please try again.'); }
  }
  async function copyPng() {
    try {
      const blob=await asPng(1024);
      await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      setToast('PNG copied to clipboard');
    } catch { setToast('Image copy unavailable. Use Download instead.'); }
  }

  function optionGrid(title:string,key:keyof AvatarState,values:readonly string[],className='') {
    return <section className="option-section"><h2>{title}</h2><div className={`option-grid ${className}`} role="radiogroup" aria-label={title}>
      {values.map(value=><button key={value} className={`option-card ${avatar[key]===value?'is-selected':''}`} role="radio" aria-checked={avatar[key]===value} onClick={()=>change({[key]:value,...(key==='character'&&value!=='Bot'?{anime:''}:{})})} title={value}>
        <span className="thumb" aria-hidden="true"><Avatar avatar={{...avatar,[key]:value}} width={96} height={96}/></span><span className="option-label">{value}</span>
      </button>)}
    </div></section>;
  }
  function swatches(title:string,key:keyof AvatarState,values:readonly (readonly [string,string])[]) {
    const current=String(avatar[key]);
    return <section className="option-section color-section"><h2>{title} <span>{current}</span></h2><div className="swatches" role="radiogroup" aria-label={title}>
      {values.map(([name,color])=><button key={name} className={`swatch ${current===name?'is-selected':''}`} style={{'--swatch':color || '#efbca8'} as React.CSSProperties} role="radio" aria-label={name} title={name} aria-checked={current===name} onClick={()=>change({[key]:name})}/>) }
    </div></section>;
  }
  function segmented(title:string,key:keyof AvatarState,values:readonly string[]) {
    return <section className="option-section"><h2>{title}</h2><div className="segmented" role="radiogroup" aria-label={title}>{values.map(value=><button key={value} role="radio" aria-checked={avatar[key]===value} className={avatar[key]===value?'active':''} onClick={()=>change({[key]:value})}>{value}</button>)}</div></section>;
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="/" aria-label="bot pfp home"><span className="brand-icon"><Avatar avatar={initialAvatar} width={36} height={36}/></span><strong>bot <span>pfp</span></strong></a>
      <div className="top-actions">
        <div className="anime-menu" ref={animeMenu}>
          <button className={`anime-trigger ${animeOpen?'active':''}`} aria-label="Like: anime PFP characters" aria-expanded={animeOpen} aria-controls="anime-presets" onClick={()=>setAnimeOpen(open=>!open)}><Heart size={17} fill={avatar.anime?'currentColor':'none'}/><span>Like</span></button>
          {animeOpen && <div className="anime-popover" id="anime-presets"><div className="anime-popover-head"><div><span className="anime-eyebrow">FAN ART COLLECTION</span><h2>Anime PFPs</h2><p>Pick a character, then make it yours.</p></div><button aria-label="Close anime presets" onClick={()=>setAnimeOpen(false)}><X size={18}/></button></div><div className="anime-grid">{animePresets.map(preset=><button key={preset.name} className={`anime-card ${avatar.anime===preset.name?'selected':''}`} aria-pressed={avatar.anime===preset.name} title={`${preset.name} · ${preset.subtitle}`} onClick={()=>{change({...initialAvatar,...preset.changes});setAnimeOpen(false);setPhotobooth(false)}}><span className="anime-avatar" aria-hidden="true"><Avatar avatar={{...initialAvatar,...preset.changes}} width={112} height={112}/></span><span className="anime-name">{preset.name}</span><span className="anime-series">{preset.series}</span></button>)}</div><button className="classic-return" onClick={()=>{change(classicAvatar);setAnimeOpen(false);setPhotobooth(false)}}>Use classic bot look</button></div>}
        </div>
        <a className="feedback" href="https://github.com/ariefzzz5421/bot-PFP/issues/new" target="_blank" rel="noopener noreferrer"><MessageSquare size={16}/> <span>Feedback</span></a><button className="pill-button" onClick={copyLink}><LinkIcon size={17}/> Copy link</button>
      </div>
    </header>

    <main className="workspace">
      <section className="preview-panel" aria-label="Avatar preview">
        <div className="preview-top"><button className={`pill-button ${photobooth?'active':''}`} aria-pressed={photobooth} onClick={()=>setPhotobooth(!photobooth)}><Camera size={17}/> Photobooth</button><button className={`pill-button ${looksOpen?'active':''}`} aria-expanded={looksOpen} onClick={()=>setLooksOpen(!looksOpen)}><Grid2X2 size={17}/> Looks</button></div>
        {looksOpen && <div className="looks-popover"><div className="looks-title"><strong>Looks</strong><button aria-label="Close looks" onClick={()=>setLooksOpen(false)}><X size={17}/></button></div><div className="looks-grid">{looks.map(look=><button key={look.name} onClick={()=>{change({...classicAvatar,...look.changes});setLooksOpen(false)}}><span className="look-thumb" aria-hidden="true"><Avatar avatar={{...classicAvatar,...look.changes}} width={56} height={56}/></span><span>{look.name}</span></button>)}</div></div>}
        <div className={`preview-center ${photobooth?'sheet':''}`} ref={svgWrap}>{photobooth?<Photobooth avatar={avatar}/>:<Avatar avatar={avatar}/>}</div>
        <div className="preview-controls"><button aria-label="Undo" title="Undo" disabled={!history.length} onClick={undo}><Undo2 size={20}/></button><button className="randomize" onClick={()=>change(randomAvatar())}><Dices size={17}/> Randomize</button><button aria-label="Redo" title="Redo" disabled={!future.length} onClick={redo}><Redo2 size={20}/></button></div>
      </section>

      <section className="editor-panel" aria-label="Customize avatar">
        <div className="editor-scroll"><nav className="tabs" role="tablist" aria-label="Parts">{tabs.map(item=><button key={item} id={`tab-${item.toLowerCase()}`} role="tab" aria-selected={tab===item} className={tab===item?'active':''} onClick={()=>setTab(item)}>{item}</button>)}</nav>
          <div className="editor-content" role="tabpanel" aria-labelledby={`tab-${tab.toLowerCase()}`}>
            {tab==='Head' && <>{optionGrid('Head','head',['Classic','Mochi','Squircle','Pebble'])}{segmented('Size','size',['Small','Medium','Large'])}{swatches('Skin','skin',skins)}{swatches('Blush','blush',blushes)}{optionGrid('Character','character',['Bot','Ghost','Cat','Muni'])}<p className="help-text">Bot takes its color from Skin</p></>}
            {tab==='Hair' && <>{optionGrid('Hair','hair',hairNames)}{swatches('Hair color','hairColor',hairs)}</>}
            {tab==='Outfit' && <>{optionGrid('Outfit','outfit',outfits)}{swatches('Outfit color','outfitColor',outfitColors)}</>}
            {tab==='Extras' && <>{optionGrid('Accessories','accessory',accessories)}{optionGrid('Held item','held',['Nothing held','Sweet potato'])}{optionGrid('Facial hair','facialHair',['None','Curly mustache','Full beard'])}<section className="option-section"><h2>Special</h2><button className={`special-toggle ${avatar.special?'is-selected':''}`} onClick={()=>change({special:!avatar.special})}>{avatar.special?<Check size={17}/>:<Heart size={17}/>} Poteto</button></section></>}
            {tab==='Backdrop' && optionGrid('Backdrop','backdrop',backdrops)}
            {tab==='Frame' && optionGrid('Frame','frame',frames)}
          </div>
          <footer className="editor-credit">made with <Heart size={12} fill="currentColor"/> by <a href="https://github.com/ariefzzz5421/bot-PFP" target="_blank" rel="noopener noreferrer">ariefzzz</a></footer>
        </div>
        <div className="download-bar"><button className="download-primary" onClick={()=>download('png')} aria-label={`Download ${photobooth?'photobooth ':''}PNG 1024 by 1024`}><Download size={18}/> Download</button><button aria-label="Copy PNG" title="Copy PNG" onClick={copyPng}><Copy size={18}/></button><button aria-label="Download PNG 2048 by 2048" title="Download 2× PNG" onClick={()=>download('png',2048)}>2×</button><button aria-label="Download SVG" title="Download SVG" onClick={()=>download('svg')}>SVG</button></div>
      </section>
    </main>
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}

export default App;
