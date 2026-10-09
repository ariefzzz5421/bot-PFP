import type { AvatarState } from './data';
import { lookup, skins, blushes, hairs, outfitColors } from './data';

type Props = { avatar: AvatarState; frame?: string; x?: number; y?: number; width?: number; height?: number };

const bgColors: Record<string,string> = { Ink:'#1d1c1d',Graphite:'#2c2b30',Charcoal:'#393a3c',Cream:'#f5e8da',Sky:'#b8d6ec',Mint:'#bdded0',Sun:'#f6cf78',Coral:'#e9a696',Lavender:'#c9bce2',Navy:'#344b69',Split:'#d6b7a9',Glow:'#324053',Halftone:'#eacaa9',Stripes:'#ddc4b6',Rays:'#e7b99c' };

function Background({name}:{name:string}) {
  const fill=bgColors[name];
  if(name==='Transparent') return null;
  return <>
    <rect width="512" height="512" fill={fill || bgColors.Ink}/>
    {name==='Split' && <path d="M0 512 512 0v512Z" fill="#c3d8d2"/>}
    {name==='Glow' && <><circle cx="270" cy="260" r="210" fill="#586a91" opacity=".48"/><circle cx="270" cy="260" r="145" fill="#97b8cc" opacity=".2"/></>}
    {name==='Halftone' && Array.from({length:12},(_,i)=>Array.from({length:12},(_,j)=><circle key={`${i}-${j}`} cx={i*46+10} cy={j*46+10} r="3" fill="#a27467" opacity=".35"/>))}
    {name==='Stripes' && Array.from({length:12},(_,i)=><path key={i} d={`M${i*64-360} 512 ${i*64+160} 0`} stroke="#bd9f96" strokeWidth="15" opacity=".4"/>)}
    {name==='Rays' && Array.from({length:12},(_,i)=><path key={i} d={`M256 270 L${256+800*Math.cos(i*Math.PI/6)} ${270+800*Math.sin(i*Math.PI/6)} L${256+800*Math.cos((i+.32)*Math.PI/6)} ${270+800*Math.sin((i+.32)*Math.PI/6)}Z`} fill="#f9dfb8" opacity=".55"/>)}
  </>;
}

function HeadShape({kind,skin}:{kind:string;skin:string}) {
  if(kind==='Ghost') return <path d="M103 288C103 165 172 102 264 105c100 2 156 76 156 182v152l-27-20-28 19-30-18-30 20-30-17-29 18-30-18-30 19-28-18-25 17V288Z" fill="#f5f3f6"/>;
  if(kind==='Cat') return <><path d="M114 224 105 93l92 55c45-21 102-22 144 0l83-53-10 130Z" fill={skin}/><path d="m129 131 17 69 41-38Zm251 0-15 67-38-35Z" fill="#e8b6be"/></>;
  if(kind==='Muni') return <><rect x="108" y="106" width="310" height="333" rx="98" fill="#a9a0d9"/><path d="m133 168-24-58 62 24m214 34 26-58-61 24" fill="#a9a0d9"/></>;
  if(kind==='Mochi') return <ellipse cx="261" cy="282" rx="160" ry="171" fill={skin}/>;
  if(kind==='Squircle') return <rect x="106" y="113" width="309" height="324" rx="90" fill={skin}/>;
  if(kind==='Pebble') return <path d="M254 111c93-9 164 60 166 164 3 106-54 167-164 166-103-1-156-59-157-166-2-100 52-155 155-164Z" fill={skin}/>;
  return <path d="M110 273c-1-103 55-163 149-163 99 0 158 65 158 167 0 111-62 164-160 164-97 0-147-59-147-168Z" fill={skin}/>;
}

function HairBack({style,color}:{style:string;color:string}) {
  if(style==='Buzz cut' || style==='Slick back') return null;
  const long=/Long|Ponytail|Twin tails|Big waves|Layered bob|Shaggy|Curly/.test(style);
  return <>
    <path d={long ? 'M100 245C73 98 184 55 279 64c111 4 168 90 148 221l36 198c-57 40-103 10-106-37l-2-114H154l-5 126c-37 42-78 24-76-25Z' : 'M100 255C75 140 141 65 262 62c130-6 186 82 166 204l-27 86-52-29H153l-43 42Z'} fill={color}/>
    {style==='Ponytail' && <path d="M398 155c75 33 99 112 61 185-16 31-45 53-70 49 43-85-16-139-27-177Z" fill={color}/>}
    {style==='Twin tails' && <><path d="M117 211c-94 44-98 165-34 217 2-89 50-109 82-154ZM401 210c95 43 101 166 34 218-2-89-51-108-83-153Z" fill={color}/></>}
    {style==='Messy bun' && <circle cx="382" cy="105" r="64" fill={color}/>}
  </>;
}

function HairFront({style,color}:{style:string;color:string}) {
  const dark='#1f1718';
  if(style==='Buzz cut') return <path d="M110 208c7-102 65-151 150-151 96 0 151 53 156 151-27-57-89-81-159-81-69 0-119 28-147 81Z" fill={color}/>;
  if(style==='Slick back') return <><path d="M106 241C92 121 156 54 260 57c108 0 159 72 153 172-61-48-105-69-162-55-74 18-111 55-145 67Z" fill={color}/><path d="M196 90c35-13 92-12 128 9" fill="none" stroke={dark} opacity=".14" strokeWidth="15" strokeLinecap="round"/></>;
  const bangs=/bang|fringe|bob|Sakura|Sailor/i.test(style);
  const spiky=style==='Spiky';
  const side=style==='Side part'||style==='Sweep'||style==='Swept fringe';
  const top=spiky ? 'M97 245 94 168 124 190 114 97 159 133 187 53 215 114 260 43 289 99 345 67 355 129 406 105 397 203 426 228' : 'M97 251C83 178 104 92 169 70c72-38 180-15 221 45 38 57 35 118 12 155';
  const fringe=bangs ? 'M400 216c-17 8-36 10-55 4-32 24-53 22-76 17-42 17-61 8-85-7-33 6-55-1-75-16l-12 36c-6-74 27-129 85-159 78-33 174-9 208 63Z' : side ? 'M399 206c-64-5-91-11-135-45-48 73-102 92-165 84 11-80 63-139 148-155 87-11 140 28 152 116Z' : 'M401 224c-28-8-39-23-52-45-11 28-37 43-66 46-32 2-54-8-68-19-27 31-68 43-113 32-7-79 43-151 133-166 98-17 175 42 166 152Z';
  return <>
    <path d={`${top} ${fringe}`} fill={color}/>
    <path d="M111 199c25-68 76-100 126-105-25 17-37 32-46 49 25-16 51-20 77-16-32 14-53 29-68 46-27-1-58 12-89 26ZM311 97c37 9 66 34 76 68-21-18-45-29-69-32 17 17 29 37 31 57-17-17-37-28-57-37 6-18 12-37 19-56Z" fill="#fff" opacity=".08"/>
    {style==='Curly' || style==='Fluffy' || style==='Big waves' ? [0,1,2,3,4,5].map(i=><circle key={i} cx={126+i*53} cy={150+(i%2)*21} r={41+(i%3)*5} fill={color}/>) : null}
    {style==='Straight bangs' && <path d="M115 179c60-64 207-93 287 1l-13 81-41-44-40 56-33-57-33 55-32-52-42 43-30-52-31 42Z" fill={color}/>}
    {style==='Spiky' && <path d="m104 216 26-88 36 36 24-96 47 52 37-71 38 75 52-40 9 91 43-25-16 71c-58-47-111-42-151-19-50 31-105 31-145 14Z" fill={color}/>}
    {style==='Dark bob' || style==='Layered bob' ? <><path d="M116 176c-33 76-6 175 42 190l-13-100 18-52ZM398 176c34 78 5 175-42 190l11-100-17-52Z" fill={color}/></> : null}
    {style==='Messy' || style==='Tousled' || style==='Shaggy' ? <><path d="m107 199-43 36 49-4m277-23 54 46-51-12" stroke={color} strokeWidth="32" strokeLinecap="round"/></> : null}
  </>;
}

function Outfit({kind,color}:{kind:string;color:string}) {
  const light=kind==='Blouse'||kind==='Shirt'||kind==='Sailor';
  return <>
    <path d="M69 512c4-83 53-127 134-139h114c83 12 127 56 130 139Z" fill={color}/>
    {kind==='Jacket' && <><path d="m204 374 45 68-51 70h-58l28-99Z" fill="#28282b"/><path d="m315 374-58 69 49 69h61l-24-101Z" fill="#333438"/><path d="m203 374 55 45 57-45-44 70-13 21-17-26Z" fill="#d9d7d2"/></>}
    {kind==='Turtleneck' && <rect x="199" y="362" width="122" height="85" rx="24" fill={color} stroke="#ffffff" strokeOpacity=".18" strokeWidth="5"/>}
    {light && <><path d="m194 374 63 56 62-56-41 84-21-21-22 21Z" fill="#f9f3e9"/>{kind==='Sailor' && <path d="M188 381 259 448l71-67-11 52-60 46-59-46Z" fill="#354b73"/>}</>}
    {kind==='High collar' && <path d="m194 374 61 31 64-31-22 102-42 23-42-23Z" fill="#252933"/>}
    {kind==='Hero suit' && <><path d="M202 375 258 440l56-65-15 137h-82Z" fill="#d5b859"/><circle cx="258" cy="459" r="18" fill="#f7e79b"/></>}
    {kind==='Jacket' && <path d="M173 512h171" stroke="#ffffff" strokeOpacity=".07" strokeWidth="5"/>}
  </>;
}

function Accessory({kind}:{kind:string}) {
  if(kind==='None') return null;
  if(kind.includes('glasses')||kind.includes('Goggles')||kind.includes('vipers')||kind.includes('sunglasses')) {
    const dark=kind.includes('sunglasses')||kind.includes('vipers');
    return <g stroke={kind==='Goggles'?'#8f9ab0':'#25242b'} strokeWidth="9" fill={dark?'#34363d':'none'} opacity=".9"><rect x="157" y="254" width="78" height="65" rx={kind==='Round glasses'?34:15}/><rect x="280" y="254" width="78" height="65" rx={kind==='Round glasses'?34:15}/><path d="M235 273q22-15 45 0"/></g>;
  }
  if(kind==='Star clip') return <path d="m357 172 7 17 19 1-14 12 5 18-17-9-16 11 4-19-14-11 19-2Z" fill="#f4d985"/>;
  if(kind==='Crown'||kind==='Tiara') return <path d="m175 129-13-72 54 29 43-51 46 51 53-29-12 72Z" fill={kind==='Crown'?'#ecca61':'#d4c5e7'} stroke="#fff0bd" strokeWidth="6"/>;
  if(kind==='Conical hat') return <><path d="M91 167 257 24l165 143Z" fill="#bf9264"/><path d="M71 169q187 44 369 0" stroke="#927052" strokeWidth="18" fill="none"/></>;
  if(kind==='Beanie') return <><path d="M127 173c-10-96 46-145 130-145 87 0 143 52 130 145Z" fill="#64748a"/><rect x="111" y="147" width="294" height="51" rx="24" fill="#526176"/></>;
  if(kind==='Beret') return <ellipse cx="254" cy="112" rx="151" ry="67" fill="#795470"/>;
  if(kind==='Fez') return <><path d="M170 151 179 45h156l9 106Z" fill="#a35050"/><path d="M319 49q34-11 46 39" fill="none" stroke="#322729" strokeWidth="8"/></>;
  return <><path d="M116 178c6-87 63-129 143-129 76 0 130 40 137 129Z" fill={kind==='Officer cap'?'#394351':'#62829b'}/><path d="M99 171h319q-9 40-96 42H130q-24-8-31-42Z" fill={kind==='Officer cap'?'#2c3642':'#52718e'}/>{kind==='Trucker hat' && <rect x="206" y="103" width="104" height="48" rx="9" fill="#e9ded0"/>}</>;
}

function Art({avatar}:{avatar:AvatarState}) {
  const skin=lookup(skins,avatar.skin,'#fae2cd');
  const blush=avatar.blush==='Match skin' ? '#eebba5' : lookup(blushes,avatar.blush,'#eebba5');
  const hair=lookup(hairs,avatar.hairColor,'#64493e');
  const outfit=lookup(outfitColors,avatar.outfitColor,'#505154');
  const size=avatar.size==='Small'?.88:avatar.size==='Large'?1.12:1;
  return <g transform={`translate(${256-256*size} ${256-256*size}) scale(${size})`}>
    <Outfit kind={avatar.outfit} color={outfit}/>
    <HairBack style={avatar.hair} color={hair}/>
    <HeadShape kind={avatar.character==='Bot'?avatar.head:avatar.character} skin={skin}/>
    {avatar.character==='Muni' && <path d="M114 215c14-84 75-126 143-127 73 0 132 47 146 126-28-22-49-30-74-31-38-2-80 17-121 17-40 0-61-2-94 15Z" fill="#958cc7"/>}
    {avatar.character==='Bot' && <HairFront style={avatar.hair} color={hair}/>}
    <g fill="#242225"><rect x="185" y="274" width="21" height="71" rx="11" transform="rotate(16 195 309)"/><rect x="307" y="274" width="21" height="71" rx="11" transform="rotate(16 317 309)"/></g>
    <ellipse cx="153" cy="346" rx="23" ry="12" fill={blush} opacity=".76" transform="rotate(17 153 346)"/>
    <ellipse cx="362" cy="354" rx="23" ry="12" fill={blush} opacity=".76" transform="rotate(17 362 354)"/>
    {avatar.facialHair==='Curly mustache' && <path d="M258 373q-27 22-47 0 8 35 47 12 39 23 47-12-20 22-47 0Z" fill={hair}/>}
    {avatar.facialHair==='Full beard' && <path d="M152 348q7 85 106 105 103-20 108-105-25 54-63 36-43 33-89 0-37 18-62-36Z" fill={hair} opacity=".92"/>}
    <Accessory kind={avatar.accessory}/>
    {avatar.held==='Sweet potato' && <g transform="translate(385 409) rotate(-24)"><ellipse cx="0" cy="0" rx="31" ry="50" fill="#a66c69"/><path d="M0-52q-3-24 12-30" stroke="#65875b" strokeWidth="9" fill="none"/></g>}
    {avatar.special && <text x="408" y="112" fontSize="43">✨</text>}
  </g>;
}

const frameTransforms:Record<string,string>={
  'Corner peek':'translate(-90 -10) scale(1.06)','Side peek':'translate(124 28) scale(1.1)','Bottom peek':'translate(0 170) scale(.92)','Top peek':'translate(0 -132) scale(.92)','Close-up':'translate(-137 -98) scale(1.54)','Tilt peek':'translate(-64 68) rotate(-17 256 256) scale(1.11)','Half face':'translate(176 -58) scale(1.49)'
};

export function Avatar({avatar,frame,x,y,width,height}:Props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width??512} height={height??512} x={x} y={y} aria-label={`${avatar.character} avatar preview`} role="img">
    <Background name={avatar.backdrop}/>
    <g transform={frameTransforms[frame||avatar.frame]||frameTransforms['Corner peek']}><Art avatar={avatar}/></g>
  </svg>;
}

export function Photobooth({avatar}:{avatar:AvatarState}) {
  const sheetFrames=['Corner peek','Bottom peek','Side peek','Close-up','Tilt peek','Top peek','Half face','Corner peek','Close-up'];
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="Nine frame avatar photobooth sheet">
    <rect width="1024" height="1024" rx="24" fill="#f6f0e9"/>
    {sheetFrames.map((frame,i)=>{
      const x=13+(i%3)*335,y=13+Math.floor(i/3)*335;
      return <g key={i}><svg x={x} y={y} width="329" height="329" viewBox="0 0 512 512" overflow="hidden"><Avatar avatar={avatar} frame={frame} width={512} height={512}/></svg><rect x={x} y={y} width="329" height="329" rx="10" fill="none" stroke="#f6f0e9" strokeWidth="4"/></g>;
    })}
  </svg>;
}
