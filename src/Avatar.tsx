import type { AvatarState } from './data';
import { animePresets, lookup, skins, blushes, hairs, outfitColors } from './data';
import { AnimeCostume, AnimeFace, AnimeHeadwear, AnimeMarks } from './AnimeArt';

type Props = { avatar: AvatarState; frame?: string; x?: number; y?: number; width?: number; height?: number };

const bgColors: Record<string,string> = { Ink:'#1d1c1d',Graphite:'#2c2b30',Charcoal:'#393a3c',Cream:'#f5e8da',Sky:'#b8d6ec',Mint:'#bdded0',Sun:'#f6cf78',Coral:'#e9a696',Lavender:'#c9bce2',Navy:'#344b69',Split:'#d6b7a9',Glow:'#324053',Halftone:'#eacaa9',Stripes:'#ddc4b6',Rays:'#e7b99c' };
const signatureOutfits = new Map(animePresets.map(preset=>[preset.name,preset.changes.outfit]));

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
  if(style==='Buzz cut' || style==='Slick back' || style==='Sage topknot') return null;
  const long=/Long|Ponytail|Twin tails|Big waves|Layered bob|Shaggy|Curly|Emperor waves|Butterfly waves|Braided|Boar mane/.test(style);
  return <>
    <path d={long ? 'M100 245C73 98 184 55 279 64c111 4 168 90 148 221l36 198c-57 40-103 10-106-37l-2-114H154l-5 126c-37 42-78 24-76-25Z' : 'M100 255C75 140 141 65 262 62c130-6 186 82 166 204l-27 86-52-29H153l-43 42Z'} fill={color}/>
    {style==='Ponytail' && <path d="M398 155c75 33 99 112 61 185-16 31-45 53-70 49 43-85-16-139-27-177Z" fill={color}/>}
    {style==='Twin tails' && <><path d="M117 211c-94 44-98 165-34 217 2-89 50-109 82-154ZM401 210c95 43 101 166 34 218-2-89-51-108-83-153Z" fill={color}/></>}
    {style==='Messy bun' && <circle cx="382" cy="105" r="64" fill={color}/>}
    {style==='Braided' && <><path d="M116 245q-65 52-45 205l54-20q-13-96 29-142Zm283 0q66 55 44 205l-54-20q13-96-29-142Z" fill={color}/>{[0,1,2,3].map(i=><g key={i} fill={color}><ellipse cx={89+i*2} cy={305+i*39} rx="30" ry="22" transform={`rotate(${i%2?25:-25} ${89+i*2} ${305+i*39})`}/><ellipse cx={423-i*2} cy={305+i*39} rx="30" ry="22" transform={`rotate(${i%2?-25:25} ${423-i*2} ${305+i*39})`}/></g>)}</>}
  </>;
}

function HairFront({style,color}:{style:string;color:string}) {
  const dark='#1f1718';
  if(style==='Pirate tousle') return <>
    <path d="M92 251 81 196 105 198 96 139 130 151 143 91 180 114 213 56 245 83 286 51 313 83 359 73 366 119 408 117 399 164 429 186 405 239c-15-21-30-28-46-34-20 29-46 37-73 28-31 26-66 35-101 21-34 32-68 27-93-3Z" fill={color}/>
    <path d="M120 161c37-48 79-70 128-77-28 18-42 40-48 61 42-23 76-31 105-26-32 13-50 34-60 52-44-7-81 0-125 27Z" fill="#fff" opacity=".1"/>
    <path d="M97 227q23 19 56 3 27 42 68 17 40 21 70-13 40 18 71-23 18 10 37 24l-19 55q-22-24-40-42-55 49-103 37-35 20-66 4-37 32-71-9Z" fill={color}/>
  </>;
  if(style==='Swordsman spikes') return <>
    <path d="M99 230 93 165 131 182 117 91 170 127 184 51 231 112 262 31 300 104 350 55 354 139 406 93 392 173 426 171 398 245q-62-45-143-42-75 1-156 27Z" fill={color}/>
    <path d="m140 169 50-58-9 65m99-46 45-47-8 75" stroke="#adf0c2" strokeWidth="9" strokeLinecap="round" opacity=".27"/>
  </>;
  if(style==='Knight spikes') return <>
    <path d="M93 246 75 166 118 184 105 111 150 128 174 62 213 110 256 51 288 103 347 56 353 133 410 99 395 173 431 205 406 247q-59-50-125-30-63 16-100 12-41 7-88 17Z" fill={color}/>
    <path d="m143 149 36-50-5 73m110-51 38-38-6 72" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity=".26"/>
  </>;
  if(style==='Soul spikes') return <>
    <path d="M91 253 70 195 111 195 97 117 151 141 176 54 220 118 259 25 297 108 359 54 358 135 414 92 398 168 443 191 407 249q-54-25-91-42-61 56-122 32-45 30-103 14Z" fill={color}/>
    <path d="m156 137 27-54 12 54 67-74-13 93 80-67-20 75" stroke="#f9d3a2" strokeWidth="8" strokeLinecap="round" opacity=".25"/>
  </>;
  if(style==='Emperor waves') return <>
    <path d="M105 199c3-90 65-147 157-145 93 1 157 62 154 155-41-22-65-69-93-87-4 54-20 92-63 124-26-42-51-76-64-117-21 29-43 53-91 70Z" fill={color}/>
    <path d="M101 220q-35 118-11 237 30-34 41-98 19-80 22-147Zm310-4q36 108 9 241-33-27-45-92-16-78-14-145Z" fill={color}/>
    <path d="M261 73q-5 73 0 132" stroke="#fff" strokeWidth="8" opacity=".13" fill="none"/>
  </>;
  if(style==='Star hair') return <path d="M99 228c-5-97 53-163 159-164 111 0 162 66 154 167l-50-40-72 38-73-29-71 44Z" fill={color}/>;
  if(style==='Hunter spikes') return <>
    <path d="M99 237 105 84 143 127 160-27 211 93 255-57 288 89 349-28 359 119 415 63 403 225q-49-29-91-23-37 5-56 37-44-36-85-32-40 2-72 30Z" fill={color}/>
    <path d="M182 96 160-8m96 118 4-113m66 103 28-93" stroke="#75a579" strokeWidth="11" opacity=".35" strokeLinecap="round"/>
  </>;
  if(style==='Silver cloud') return <>
    <path d="M102 261c-31-80 7-160 67-184 41-17 72-10 103-24 63-10 139 31 149 103 10 42 3 74-21 111-35-25-58-22-80-13-34-13-55-6-76 9-28-13-56-10-83 7-20-9-38-13-59-9Z" fill={color}/>
    {[120,164,207,256,306,354,397].map((x,i)=><circle key={i} cx={x} cy={144+(i%2)*21} r={43+(i%3)*4} fill={color}/>)}
    <path d="M118 182q23-27 56-23m41-44q28-17 56-3m47 32q24-8 46 6" stroke="#fff" strokeWidth="10" opacity=".28" strokeLinecap="round" fill="none"/>
  </>;
  if(style==='Sage topknot') return <><path d="M232 113q-23-45-14-80 10-31 39-32 27 2 39 32 6 34-16 80Z" fill={color}/><path d="M213 89q43 19 86 0" stroke="#eee" strokeWidth="14" fill="none"/><path d="M192 129q65-17 130 0" stroke={color} strokeWidth="15" opacity=".6" fill="none"/></>;
  if(style==='Flame layers') return <><path d="M88 256 63 170 111 190 113 94 160 131 189 34 226 109 275 22 306 105 365 50 360 140 425 95 401 182 446 214 410 267q-37-39-79-44-42 26-76 11-43 30-73 6-44 35-94 16Z" fill={color}/><path d="M91 222 87 146l38 41 21-73 33 47 37-76 40 68 51-86 26 83 62-60-14 93 41-25-15 83q-33-31-66-35-29 22-62 13-28 21-63 7-30 24-66 5-29 20-59 9Z" fill="#eb613c"/><path d="m114 196 34-52 14 46m71-59 32-62 22 81m51-7 39-42-9 77" fill="none" stroke="#f9d466" strokeWidth="17" strokeLinecap="round"/></>;
  if(style==='Flat top') return <><path d="M102 227 102 85q0-30 30-30h247q31 0 31 31v141l-34-17H135Z" fill={color}/><path d="M118 87h276" stroke="#fff" strokeOpacity=".22" strokeWidth="10"/><path d="M104 210q82-28 160-20 81-11 146 20" fill="none" stroke={color} strokeWidth="22"/></>;
  if(style==='Pompadour') return <><path d="M101 254Q64 138 128 80q27-29 77-31 12-50 74-43 106 10 126 108 14 73-3 142-48-30-89-26-45 12-87 0-62 24-125 24Z" fill={color}/><path d="M127 159q-12-58 37-85 40-23 94 6 55-28 103 9 20 20 24 57-43-18-90-3-46-21-94-1-43-10-74 17Z" fill="#fff" opacity=".1"/><path d="M143 157q64-69 124-27 72-41 107 30" fill="none" stroke={color} strokeWidth="26" strokeLinecap="round"/></>;
  if(style==='Tower') return <><path d="M139 247 158-37h194l20 284q-104-40-233 0Z" fill={color}/><path d="M177-8h157" stroke="#fff" strokeOpacity=".25" strokeWidth="10"/><path d="m174 58-11 104m180-104 11 104" stroke="#77777e" strokeOpacity=".4" strokeWidth="7"/></>;
  if(style==='Bubble curls') return <><path d="M97 255Q62 83 256 68q178-8 159 187-31-32-61-20-52 27-93 9-48 22-90-5-34 10-74 16Z" fill={color}/>{[178,256,334].map((x,i)=><g key={x}><circle cx={x} cy={i===1?127:139} r="43" fill={color}/><path d={`M${x-22} ${i===1?128:140}q22-25 44 0-18 25-44 0Z`} fill="#b58a33" opacity=".45"/></g>)}</>;
  if(style==='Butterfly waves') return <><path d="M95 250Q80 79 254 66q170 0 161 184-38-27-60-24-45 28-97 15-55 30-94 3-34 20-69 6Z" fill={color}/><path d="M145 132q75 87 220 1-20 80-76 100-77 24-144-101Z" fill={color}/><path d="M124 188q-34 50-24 112m288-114q34 50 24 112" stroke={color} strokeWidth="38" strokeLinecap="round"/></>;
  if(style==='Boar mane') return <><path d="M80 259 67 183 107 194 96 106 151 139 176 57 220 123 252 44 296 114 354 58 361 140 416 106 403 190 447 211 405 263Z" fill={color}/><path d="M80 246q79-51 178-36 89-17 156 38l-19 52q-66-36-139-27-81-9-157 30Z" fill={color}/></>;
  if(style==='Braided') return <><path d="M101 235q-16-97 50-146 48-35 109-32 117 2 150 93l-12 93q-35-20-56-17-34 25-78 10-39 25-79 4-39 17-84-5Z" fill={color}/><path d="M148 124q39 33 107 31 66 0 107-32" fill="none" stroke="#fff" strokeOpacity=".13" strokeWidth="11"/></>;
  if(style==='Wavy') return <>
    <path d="M94 260c-28-79 1-150 67-185 47-26 89-22 128-18 65-8 115 31 132 91 15 49 4 100-24 137-12-29-26-45-45-51-11 20-34 34-60 39-26 6-48 3-69-9-22 29-59 43-94 37-19-3-29-18-35-41Z" fill={color}/>
    <path d="M100 225c11-59 48-99 104-119-27 27-24 35-18 42 31-24 68-37 98-31-39 16-55 38-55 58 32-10 68-25 92-49-7 33-22 58-51 72-39 20-57 9-71 14-24 20-59 26-99 13Z" fill="#201919" opacity=".17"/>
    <path d="M112 181c30-54 91-91 158-92-37 16-60 29-72 47 45-14 67-8 89-2-26 8-47 22-65 38-31-7-69-5-110 9Zm154-91c46-9 90 11 119 44-31-9-52-9-70-4 24 13 34 26 46 44-35-14-60-19-81-17 3-26-1-46-14-67Z" fill="#fff" opacity=".11"/>
    <path d="M95 246c-2 54 9 85 31 105l8-84c18 26 43 26 59 22-35 39-61 42-98-43Zm299-8c25 44 21 97-4 135l-16-68c-15 15-39 24-61 22 33-30 59-51 81-89Z" fill={color}/>
  </>;
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
    {kind==='Red vest' && <><path d="m188 375 65 70 65-70-28 137H218Z" fill="#f2c69d"/><path d="m197 375 41 57-27 80h-85l32-106Zm122 0-42 57 25 80h87l-31-106Z" fill={color}/><path d="M248 432v80" stroke="#78302f" strokeWidth="8"/></>}
    {kind==='Green robe' && <><path d="m194 374 62 73 65-73-19 138H206Z" fill="#efe9d8"/><path d="M166 400 256 464l-44 48H96Zm182 0-92 64 44 48h112Z" fill={color}/><path d="m186 477 136 23" stroke="#202e29" strokeWidth="21"/></>}
    {kind==='Black cloak' && <><path d="m165 393 54-26 37 70 37-70 56 26-24 119H187Z" fill="#1c202a"/><path d="M177 398 256 468l79-70" fill="none" stroke="#d2b797" strokeWidth="12"/><path d="M162 404 80 512h82l51-85Z" fill="#333846"/></>}
    {kind==='Soul robe' && <><path d="m180 385 76 76 74-76-20 127H201Z" fill="#eee4d7"/><path d="m158 394 96 82-43 36H90Zm197 0-99 82 44 36h112Z" fill="#202027"/><path d="m207 458 98 54" stroke="#f4f1e9" strokeWidth="13"/></>}
    {kind==='Royal coat' && <><path d="m179 377 76 92 77-92 65 135H117Z" fill="#f5efe5"/><path d="m220 378 35 60 38-60 23 134H198Z" fill="#212934"/><path d="M255 448v64m-71-96 28 61m112-61-27 61" stroke="#c9c4bd" strokeWidth="7"/><path d="m254 420 17 22-17 22-17-22Z" fill="#d3d6da"/></>}
    {kind==='Long coat' && <><path d="m177 376 78 70 78-70-23 136H203Z" fill="#404356"/><path d="m190 389 65 82-31 41H116l51-109Zm132 0-67 82 34 41h107l-47-109Z" fill={color}/><path d="M327 392q23 40 50 62" fill="none" stroke="#e6c36b" strokeWidth="9"/><circle cx="378" cy="454" r="12" fill="#d9b45b"/></>}
    {kind==='Green jacket' && <><path d="m180 382 75 66 75-66-22 130H204Z" fill="#f5d7a7"/><path d="m166 404 88 68-37 40H91Zm178 0-89 68 39 40h120Z" fill={color}/><path d="M207 399v101m97-101v101" stroke="#b64746" strokeWidth="11"/></>}
    {kind==='Blue hoodie' && <><path d="M185 382q71-44 144 0l43 130H139Z" fill={color}/><path d="M182 387q73 60 148 0" stroke="#b4d8ec" strokeWidth="18" fill="none"/><path d="m232 444-5 55m56-55 5 55" stroke="#e9ecf2" strokeWidth="7" strokeLinecap="round"/></>}
    {kind==='Martial tunic' && <><path d="m192 380 63 72 65-72-20 132H210Z" fill="#eef1e7"/><path d="M165 409 256 473l-38 39H96Zm182 0-91 64 39 39h119Z" fill={color}/><path d="M186 498h142" stroke="#5a7da5" strokeWidth="22"/></>}
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
  if(kind==='Straw hat') return <><path d="M119 164c13-89 63-134 139-134 79 0 130 47 140 134Z" fill="#dbaf65"/><path d="M130 151q128 19 256 0" stroke="#a73d39" strokeWidth="28" fill="none"/><ellipse cx="258" cy="175" rx="202" ry="29" fill="#dfb772"/><path d="M91 181q162 42 333 0" stroke="#b68b54" strokeWidth="8" fill="none"/></>;
  if(kind==='Black headband') return <><path d="M107 180q150-56 303 0l-5 48q-143-43-294 1Z" fill="#25252d"/><path d="M260 180 307 164l42 15-6 39-77 3Z" fill="#b3bcc3"/><path d="m294 185 16 14-16 13-16-13Z" fill="#4e555d"/></>;
  if(kind==='Star cap') return <><path d="M109 206c-2-108 52-162 149-162 100 0 157 54 149 162Z" fill="#303238"/><path d="M101 210q157-20 316 0-35 45-144 43H159q-38-6-58-43Z" fill="#222329"/><path d="m258 113 10 27 27 1-22 18 8 27-23-16-23 16 8-27-22-18 27-1Z" fill="#d5bd64"/></>;
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

function AnimeProps({name}:{name:string}) {
  if(name==='Roronoa Zoro') return <g><path d="m46 501 116-259m304 259L354 231" stroke="#bfc5c4" strokeWidth="17"/><path d="m98 389 80-159m242 165-75-168" stroke="#343139" strokeWidth="23"/><path d="m63 475 65-130m336 136-61-126" stroke="#c9aa68" strokeWidth="10"/></g>;
  if(name==='Kurosaki Ichigo') return <g><path d="M409 495 100 64" stroke="#e0e0df" strokeWidth="23"/><path d="m368 438 49-33" stroke="#23232b" strokeWidth="23"/></g>;
  if(name==='Asta') return <g><path d="M79 514 386 127" stroke="#383a47" strokeWidth="48"/><path d="M75 511 377 134" stroke="#9b9a9d" strokeWidth="14"/></g>;
  if(name==='Yhwach') return <g opacity=".52"><path d="M74 471Q16 291 131 123m305 349q95-165-12-332" fill="none" stroke="#6b92d2" strokeWidth="18" strokeLinecap="round"/></g>;
  if(name==='Tanjiro Kamado'||name==='Giyu Tomioka') return <g><path d="M88 514 426 52" stroke="#dbe7eb" strokeWidth="16"/><path d="m82 509 66-89" stroke="#252d34" strokeWidth="23"/><path d="M53 470q50-21 94-62m240-286q50 30 70 83" fill="none" stroke="#80c4cf" strokeWidth="17" opacity=".67"/></g>;
  if(name==='Zenitsu Agatsuma') return <g><path d="M85 505 425 69" stroke="#eae7e1" strokeWidth="13"/><path d="m82 500 81-101" stroke="#edbc4b" strokeWidth="22"/><path d="m402 94-34 80 29-11-39 84" fill="none" stroke="#f9dc66" strokeWidth="13"/></g>;
  if(name==='Kurapika') return <g fill="none" stroke="#d3ba58" strokeWidth="11"><path d="M60 473q-39-106 58-183m336 179q41-105-62-183"/><circle cx="66" cy="465" r="22" fill="#ece5c6"/></g>;
  if(name==='Killua Zoldyck'||name==='Kilua') return <g fill="none" stroke="#ecfaff" strokeWidth="14" opacity=".9"><path d="m70 129 48 50-38 20 46 51m296-97-48 50 38 20-46 51"/></g>;
  if(name==='Hisoka Morow') return <g><path d="m51 172 58-46 58 46-58 46Z" fill="#f1ece8" stroke="#c7798c" strokeWidth="8"/><path d="m399 172 58-46 58 46-58 46Z" fill="#f1ece8" stroke="#6885bb" strokeWidth="8"/></g>;
  if(name==='Kujo Jotaro'||name==='DIO') return <g fill="none" stroke="#d3c179" strokeWidth="10" opacity=".65"><path d="m66 92 27 34 35-19m268 19 36-33 20 42"/><path d="M54 423q-48-79 18-147m372 149q52-79-14-147"/></g>;
  return null;
}

function Art({avatar}:{avatar:AvatarState}) {
  const skin=lookup(skins,avatar.skin,'#fae2cd');
  const blush=avatar.blush==='Match skin' ? '#eebba5' : lookup(blushes,avatar.blush,'#eebba5');
  const hair=lookup(hairs,avatar.hairColor,'#64493e');
  const outfit=lookup(outfitColors,avatar.outfitColor,'#505154');
  const size=avatar.size==='Small'?.88:avatar.size==='Large'?1.12:1;
  return <g transform={`translate(${256-256*size} ${256-256*size}) scale(${size})`}>
    <AnimeProps name={avatar.anime}/>
    <Outfit kind={avatar.outfit} color={outfit}/>
    <AnimeCostume name={avatar.outfit===signatureOutfits.get(avatar.anime)?avatar.anime:''}/>
    <HairBack style={avatar.hair} color={hair}/>
    <HeadShape kind={avatar.character==='Bot'?avatar.head:avatar.character} skin={skin}/>
    {avatar.character==='Muni' && <path d="M114 215c14-84 75-126 143-127 73 0 132 47 146 126-28-22-49-30-74-31-38-2-80 17-121 17-40 0-61-2-94 15Z" fill="#958cc7"/>}
    {avatar.character==='Bot' && <HairFront style={avatar.hair} color={hair}/>}
    {avatar.anime?<AnimeFace name={avatar.anime} skin={skin}/>:<g fill="#242225"><rect x="185" y="274" width="21" height="71" rx="11" transform="rotate(16 195 309)"/><rect x="307" y="274" width="21" height="71" rx="11" transform="rotate(16 317 309)"/></g>}
    {avatar.anime!=='Brook'&&avatar.anime!=='Inosuke Hashibira'&&<><ellipse cx="153" cy="346" rx="23" ry="12" fill={blush} opacity=".57" transform="rotate(17 153 346)"/><ellipse cx="362" cy="354" rx="23" ry="12" fill={blush} opacity=".57" transform="rotate(17 362 354)"/></>}
    {avatar.facialHair==='Curly mustache' && <path d="M258 373q-27 22-47 0 8 35 47 12 39 23 47-12-20 22-47 0Z" fill={hair}/>}
    {avatar.facialHair==='Full beard' && avatar.anime!=='Netero' && <path d="M152 348q7 85 106 105 103-20 108-105-25 54-63 36-43 33-89 0-37 18-62-36Z" fill={hair} opacity=".92"/>}
    <AnimeMarks name={avatar.anime}/>
    <Accessory kind={avatar.accessory}/>
    {avatar.accessory==='None' && <AnimeHeadwear name={avatar.anime}/>}
    {avatar.held==='Sweet potato' && <g transform="translate(385 409) rotate(-24)"><ellipse cx="0" cy="0" rx="31" ry="50" fill="#a66c69"/><path d="M0-52q-3-24 12-30" stroke="#65875b" strokeWidth="9" fill="none"/></g>}
    {avatar.special && <text x="408" y="112" fontSize="43">✨</text>}
  </g>;
}

const frameTransforms:Record<string,string>={
  'Corner peek':'translate(-90 -10) rotate(8 256 256) scale(1.06)','Side peek':'translate(124 28) scale(1.1)','Bottom peek':'translate(0 170) scale(.92)','Top peek':'translate(0 -132) scale(.92)','Close-up':'translate(-137 -98) scale(1.54)','Tilt peek':'translate(-64 68) rotate(-17 256 256) scale(1.11)','Half face':'translate(176 -58) scale(1.49)'
};

export function Avatar({avatar,frame,x,y,width,height}:Props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width??512} height={height??512} x={x} y={y} aria-label={`${avatar.anime||avatar.character} avatar preview`} role="img">
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
