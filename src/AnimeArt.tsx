import type { ReactNode } from 'react';

// All portraits are original SVG shapes. These overlays keep presets recognizable
// while the editor's hair, color, backdrop, outfit and framing controls still work.
export function AnimeFace({name,skin}:{name:string;skin:string}) {
  if(!name) return null;
  if(name==='Brook') return <><path d="M129 223q3-113 126-118 123 5 128 118l-4 125q-29 92-123 100-94-8-124-100Z" fill="#f2eddf"/><path d="M166 274q22-32 57 0 7 32-27 50-34-10-30-50Zm124 0q23-32 57 0 7 32-27 50-35-10-30-50Z" fill="#202126"/><path d="m256 312-22 47h44Z" fill="#353238"/><path d="M200 383q57 24 113 0l-12 42h-89Z" fill="#23232a"/><path d="M220 391v31m22-26v32m24-32v32m23-37v31" stroke="#f3f0e6" strokeWidth="7"/></>;
  if(name==='Inosuke Hashibira') return null;
  const iris = /Zoro|Gon|Sanji|Yoruichi|Meruem|DIO/.test(name)?'#638c70':/Killua|Toshiro|Jolyne|Giyu|Uryu|Jotaro|Polnareff/.test(name)?'#5d91bb':/Kurapika|Hisoka|Nezuko|Muzan/.test(name)?'#b2494e':'#674d42';
  const sharp = /Ichigo|Yhwach|Jotaro|DIO|Chrollo|Muzan|Kenpachi|Zoro|Hisoka/.test(name);
  const brow = sharp?'M165 254q19-15 44-9m95 0q26-6 45 9':'M165 251q22-12 46-5m92 0q25-7 47 5';
  return <>
    <path d={brow} stroke="#443835" strokeWidth={sharp?8:6} fill="none" strokeLinecap="round"/>
    {[195,317].map((x,i)=><g key={x}>
      <path d={`M${x-39} 291q34-34 78 0-39 34-78 0Z`} fill="#fef9f3" stroke="#3b3033" strokeWidth="7" strokeLinejoin="round"/>
      <ellipse cx={x} cy="292" rx="16" ry="22" fill={iris}/><ellipse cx={x} cy="292" rx="8" ry="18" fill="#22232b"/>
      <ellipse cx={x-6} cy="283" rx="5" ry="7" fill="#fff"/>
      <path d={i===0?`M${x-41} 287l-10-9`:`M${x+41} 287l10-9`} stroke="#363037" strokeWidth="6" strokeLinecap="round"/>
    </g>)}
    <path d="m258 315-7 30q7 7 16 1" fill="none" stroke="#b98577" strokeWidth="4" strokeLinecap="round"/>
    <path d={/Luffy|Gon|Nami|Zenitsu|Joseph|Franky/.test(name)?'M229 376q26 24 55 0':'M237 380q19 8 39 0'} fill="none" stroke="#995e5c" strokeWidth="5" strokeLinecap="round"/>
    <path d="M155 341q20 11 40 3m119 0q22 7 43-3" fill="none" stroke={skin} strokeWidth="5" opacity=".65"/>
  </>;
}

const haori:Record<string,[string,string]>={
  'Tanjiro Kamado':['#163b35','#23816a'],'Nezuko Kamado':['#e99eaa','#f8d6d9'],
  'Zenitsu Agatsuma':['#f3ba4d','#fff4a4'],'Giyu Tomioka':['#9e453c','#37786e'],
  'Shinobu Kocho':['#f4f0f0','#ac8bc7'],'Kyojuro Rengoku':['#f3f0e2','#ec6435'],
  'Mitsuri Kanroji':['#faf0ed','#7caa7b'],'Muichiro Tokito':['#232d32','#428b85']
};

export function AnimeCostume({name}:{name:string}) {
  const cloth=haori[name];
  if(cloth) return <>
    <path d="M71 512q25-96 122-127l63 73 65-73q97 31 120 127Z" fill={cloth[0]}/>
    {name==='Tanjiro Kamado' && <g fill={cloth[1]}>{[0,1,2,3].map(i=><g key={i}><path d={`M${81+i*47} 416h27v27h-27Z`}/><path d={`M${74+i*47} 455h27v27h-27Z`}/></g>)}</g>}
    {name==='Nezuko Kamado' && <g fill="none" stroke="#c46d83" strokeWidth="7"><path d="m161 397 98 96 98-96M133 430l82 82m160-82-82 82"/></g>}
    {name==='Zenitsu Agatsuma' && <g fill={cloth[1]}>{[0,1,2,3,4].map(i=><path key={i} d={`m${93+i*70} 417 21 15-21 18-20-18Z`}/>)}</g>}
    {name==='Giyu Tomioka' && <><path d="M256 455 329 387q90 35 112 125H256Z" fill={cloth[1]}/><path d="m288 480 29 28m10-54 46 49m-3-76 46 52" stroke="#cedab7" strokeWidth="10" opacity=".7"/></>}
    {name==='Shinobu Kocho' && <><path d="M86 512q27-77 94-116 80 54 152 0 72 44 94 116" fill="none" stroke={cloth[1]} strokeWidth="15"/><path d="M107 475q151 41 298 0" fill="none" stroke="#92c5ac" strokeWidth="10"/></>}
    {name==='Kyojuro Rengoku' && <><path d="M74 512q26-79 91-109l58 109Zm364 0q-25-79-90-109l-59 109Z" fill={cloth[1]}/><path d="m76 496 41-44 21 35 26-61 45 86m89 0 44-86 27 61 22-35 42 44" fill="none" stroke="#f7b045" strokeWidth="13"/></>}
    {name==='Mitsuri Kanroji' && <path d="m193 396 63 82 63-82" fill="none" stroke="#a8caab" strokeWidth="25"/>}
    {name==='Muichiro Tokito' && <path d="m91 506 60-94m273 94-60-94" stroke={cloth[1]} strokeWidth="21" opacity=".7"/>}
    <path d="m190 380 66 83 67-83" fill="none" stroke="#f2eee4" strokeWidth="18"/>
  </>;
  if(name==='Nami') return <><path d="m167 390 86 70 91-70" fill="none" stroke="#f0e5d2" strokeWidth="22"/><circle cx="256" cy="470" r="16" fill="#e4c674"/></>;
  if(name==='Sanji') return <><path d="m198 385 58 57 58-57" fill="none" stroke="#faf7ed" strokeWidth="17"/><path d="m256 435 15 19-15 48-15-48Z" fill="#416f9a"/></>;
  if(name==='Usopp') return <><path d="M104 457q66-67 142-40m162 40q-68-66-143-40" stroke="#e8c89e" strokeWidth="30" fill="none"/><path d="m104 460 53 51m251-51-53 51" stroke="#a37e5b" strokeWidth="22"/></>;
  if(name==='Franky') return <><path d="m170 398 91 96 90-96" fill="none" stroke="#f4f1e7" strokeWidth="26"/><path d="m168 397 37 100m148-100-38 100" stroke="#3c8cba" strokeWidth="18"/></>;
  if(name==='Chrollo Lucilfer') return <><path d="m96 512 85-125 75 84 76-84 85 125" fill="none" stroke="#d8d3be" strokeWidth="12"/><path d="m255 458-22 29 22 28 23-28Z" fill="#673d59"/></>;
  if(name==='Hisoka Morow') return <><path d="m145 414 54 32-36 48m210-80-57 31 39 51" fill="none" stroke="#d99ba9" strokeWidth="22"/><path d="m256 428 37 35-37 36-36-36Z" fill="#e7c24f"/></>;
  if(name==='Jolyne Cujoh') return <><path d="m169 404 83 57 91-57" fill="none" stroke="#d7cfdd" strokeWidth="16"/><path d="M254 458v54" stroke="#a68db5" strokeWidth="20"/></>;
  if(name==='Giorno Giovanna') return <><path d="m169 392 85 72 86-72" fill="none" stroke="#daacb6" strokeWidth="15"/><path d="m256 451-27 25 27 26 27-26Z" fill="#dfca75"/></>;
  if(name==='Bruno Bucciarati') return <><path d="m160 397 96 78 96-78" fill="none" stroke="#272b35" strokeWidth="19"/><path d="m180 436 26 30m128-30-26 30" stroke="#daa75d" strokeWidth="13"/></>;
  if(name==='Josuke Higashikata') return <><path d="m159 393 96 68 97-68" fill="none" stroke="#d8c473" strokeWidth="18"/><path d="m256 463-13 21 13 22 14-22Z" fill="#e8c468"/></>;
  if(name==='Kurapika') return <><path d="M160 400q96 92 193 0" fill="none" stroke="#e4c94f" strokeWidth="19"/><path d="M256 445v67" stroke="#e4c94f" strokeWidth="10"/></>;
  if(name==='Uryu Ishida') return <><path d="M256 415v95" stroke="#6ea9d6" strokeWidth="9"/><path d="m236 451 20-20 20 20-20 20Z" fill="#6ea9d6"/></>;
  if(name==='Renji Abarai') return <path d="m174 393 82 70 84-70" stroke="#eee7d9" strokeWidth="25" fill="none"/>;
  if(name==='Yoruichi Shihouin') return <path d="m164 405 91 65 91-65" stroke="#e0bd80" strokeWidth="22" fill="none"/>;
  return null;
}

const marks:Record<string,ReactNode>={
    'Monkey D Luffy':<path d="m161 325 25 19m-13-27 22 18" stroke="#ad615a" strokeWidth="5" strokeLinecap="round"/>,
    'Roronoa Zoro':<><path d="m165 254 37 87" stroke="#b86464" strokeWidth="5"/><path d="M163 282q22-7 44 4" stroke="#463d3f" strokeWidth="6" fill="none"/><circle cx="130" cy="290" r="8" fill="#dfba78"/><circle cx="132" cy="312" r="8" fill="#dfba78"/></>,
    'Usopp':<><path d="m255 305-22 88q21 21 45 0Z" fill="#bd8469"/><path d="m153 395 59 22" stroke="#b87957" strokeWidth="8"/></>,
    'Sanji':<><path d="M306 266q30-23 52-1-26-3-27 20" stroke="#6f5b49" strokeWidth="6" fill="none"/><circle cx="177" cy="299" r="3" fill="#2d2b2c"/></>,
    'Tony Tony Chopper':<><ellipse cx="256" cy="355" rx="36" ry="22" fill="#56647d"/><ellipse cx="256" cy="347" rx="16" ry="7" fill="#a6c1d0"/></>,
    'Franky':<><path d="m236 333 20 37 20-37Z" fill="#338eb7"/><path d="M167 366q88 60 178 0" stroke="#ac655b" strokeWidth="5" fill="none"/></>,
    'Jinbe':<><path d="m197 263 27 16m90-16-27 16" stroke="#204d66" strokeWidth="10"/><path d="m253 323 33 36-33 16-34-16Z" fill="#285c78"/><path d="M181 382q75 62 151 0" stroke="#d9d0ba" strokeWidth="8" fill="none"/></>,
    'Renji Abarai':<><path d="m166 220 72 25m42 0 69-25M190 235l18 28m126-29-18 28" stroke="#3b2e35" strokeWidth="8" fill="none"/></>,
    'Byakuya Kuchiki':<><path d="M134 171q116-33 245 0" stroke="#f7f1de" strokeWidth="9" fill="none"/><path d="m158 210 18-35m184 35-18-35" stroke="#f7f1de" strokeWidth="12"/></>,
    'Kenpachi Zaraki':<><path d="m145 255 57 61m160-48-56 55" stroke="#b66865" strokeWidth="7"/><path d="m165 194 50-29m83 0 53 29" stroke="#35313a" strokeWidth="12"/></>,
    'Yhwach':<path d="M256 368q-27 18-57-1 18 31 57 18 40 13 57-18-30 19-57 1Z" fill="#25242a"/>,
    'Jonathan Joestar':<path d="m133 229 46 26m199-26-46 26" stroke="#313b5d" strokeWidth="12"/>,
    'Joseph Joestar':<path d="m168 350 20 24m137-24-20 24" stroke="#9b6254" strokeWidth="7"/>,
    'Josuke Higashikata':<path d="m182 270 24-13m100 0 25 13" stroke="#31313d" strokeWidth="8"/>,
    'Jolyne Cujoh':<><path d="m142 240 26 19m205-19-26 19" stroke="#4e765a" strokeWidth="12"/><path d="m240 380 16 15 16-15" stroke="#c1838a" strokeWidth="5" fill="none"/></>,
    'DIO':<><path d="m158 266 53-18m92 0 53 18" stroke="#425451" strokeWidth="10"/><path d="m233 378 22 16 23-16" fill="none" stroke="#904e51" strokeWidth="6"/></>,
    'Noriaki Kakyoin':<path d="m172 343 20 15m130-15-20 15" stroke="#9d6263" strokeWidth="7"/>,
    'Jean Pierre Polnareff':<path d="m192 252 21-8m90 0 21 8" stroke="#666179" strokeWidth="9"/>,
    'Hisoka Morow':<><path d="m161 302 18 16-18 16-18-16Zm194 0 18 16-18 16-18-16Z" fill="#c7728d"/><path d="m159 325 15 15m183-15-15 15" stroke="#578eb6" strokeWidth="7"/></>,
    'Chrollo Lucilfer':<><path d="m248 195 9 16 9-16m-18 0 9-15 9 15" stroke="#352c35" strokeWidth="7" fill="none"/><path d="m250 216 7 12 7-12" fill="#352c35"/></>,
    'Netero':<><path d="M180 374q74 28 152 0-9 83-76 99-67-16-76-99Z" fill="#e4e4df"/><path d="M214 423q41 20 83 0" fill="none" stroke="#b1b3b1" strokeWidth="6"/><path d="M176 257q25-19 54 0m52 0q26-19 54 0" fill="none" stroke="#f0eee8" strokeWidth="16" strokeLinecap="round"/></>,
    'Illumi Zoldyck':<><circle cx="195" cy="292" r="23" fill="#111318"/><circle cx="317" cy="292" r="23" fill="#111318"/><circle cx="185" cy="283" r="6" fill="#fff"/><circle cx="307" cy="283" r="6" fill="#fff"/></>,
    'Meruem':<><path d="m166 315 23 9m137-9-23 9" stroke="#334b38" strokeWidth="9"/><path d="m239 374 17 12 17-12" fill="none" stroke="#303d34" strokeWidth="7"/></>,
    'Tanjiro Kamado':<><path d="m148 205 28-47 20 15 16-31 26 30-17 42-33-5-21 22Z" fill="#a44543"/><path d="m174 267 26-11" stroke="#883e3e" strokeWidth="5"/></>,
    'Nezuko Kamado':<><rect x="191" y="357" width="132" height="34" rx="11" fill="#73a38c" stroke="#487963" strokeWidth="6"/><path d="m209 362 19 25m28-25 18 25m28-25 16 25" stroke="#a6cdb0" strokeWidth="5"/></>,
    'Zenitsu Agatsuma':<path d="m175 343 16 10m130-10-16 10" stroke="#d28d6b" strokeWidth="6"/>,
    'Giyu Tomioka':<path d="m236 378 20 7 20-7" stroke="#9a6260" strokeWidth="4" fill="none"/>,
    'Shinobu Kocho':<><path d="M153 285q43-30 83 0m40 0q42-30 83 0" stroke="#4e4557" strokeWidth="7" fill="none"/><path d="m154 267-12-12m218 12 12-12" stroke="#4e4557" strokeWidth="7"/></>,
    'Kyojuro Rengoku':<><path d="m154 257 58-17m88 0 58 17" stroke="#4a3030" strokeWidth="11"/><path d="m233 380 23 14 22-14" stroke="#934f42" strokeWidth="6" fill="none"/></>,
    'Tengen Uzui':<><path d="m130 251 24 14m228-14-24 14" stroke="#b95e67" strokeWidth="9"/><path d="m162 322 26 17m162-17-26 17" stroke="#b95e67" strokeWidth="6"/></>,
    'Muzan Kibutsuji':<path d="m186 376 70 15 70-15" stroke="#8a4a4e" strokeWidth="6" fill="none"/>
};

export function AnimeMarks({name}:{name:string}) {
  return marks[name] || null;
}

export function AnimeHeadwear({name}:{name:string}) {
  if(name==='Tony Tony Chopper') return <><path d="m165 95-56-64-17 6 15 92m240-34 57-64 17 6-15 92" stroke="#a87963" strokeWidth="28" fill="none" strokeLinecap="round"/><path d="M105 162q21-127 151-127 131 0 152 127Z" fill="#e8809d"/><path d="M93 158q162 36 326 0" stroke="#f2c2d0" strokeWidth="25" fill="none"/><path d="M230 93h51v44h-51Z" fill="#faf7ed"/><path d="M255 96v38m-19-19h39" stroke="#e4859d" strokeWidth="13"/></>;
  if(name==='Kisuke Urahara') return <><path d="M123 174 175 42h160l54 132Z" fill="#638563"/><path d="m163 83 190 0m-217 50h242" stroke="#e9e3cc" strokeWidth="21"/><ellipse cx="256" cy="184" rx="189" ry="24" fill="#496e56"/></>;
  if(name==='Tengen Uzui') return <><path d="M110 194q137-74 295 0l-12 45q-144-40-267 0Z" fill="#e4e0df"/><path d="M151 166q110-54 215 0" stroke="#b6bbc8" strokeWidth="12" fill="none"/>{[185,256,326].map(x=><path key={x} d={`m${x} 170 18 20-18 20-18-20Z`} fill="#8ed0d2" stroke="#7797b3" strokeWidth="4"/>)}</>;
  if(name==='Inosuke Hashibira') return <><path d="M95 174q11-110 160-117 151 0 164 117l-27 166q-56 89-136 101-87-12-137-101Z" fill="#7d7884"/><path d="M111 178 71 93l102 33m227 52 41-85-103 33" fill="#99949d"/><path d="m137 208 58 62-58 44-45-50Zm238 0-59 62 59 44 45-50Z" fill="#64b5c6" stroke="#34383e" strokeWidth="12"/><path d="M255 284q-61 0-63 47l64 48 63-48q-3-47-64-47Z" fill="#bd9b9e"/><ellipse cx="231" cy="329" rx="9" ry="13" fill="#4a484f"/><ellipse cx="280" cy="329" rx="9" ry="13" fill="#4a484f"/><path d="m190 385 22 16 16-11 27 16 27-16 18 11 23-16" stroke="#f8f4e9" strokeWidth="12" fill="none"/></>;
  if(name==='Muzan Kibutsuji') return <><path d="M111 171q14-110 143-117 133 5 149 117Z" fill="#f6eee8"/><path d="M145 144q117 35 221 0" stroke="#28252a" strokeWidth="25" fill="none"/><ellipse cx="258" cy="185" rx="191" ry="24" fill="#f7f0e9"/></>;
  if(name==='Jolyne Cujoh') return <><path d="M112 190q138-62 288 0" fill="none" stroke="#4d8f6d" strokeWidth="20"/><path d="M140 157q57-31 113-9 52-23 116 9" fill="none" stroke="#9cc481" strokeWidth="10"/></>;
  if(name==='Biscuit Krueger') return <><path d="m142 128-37-38-26 44 55 23m236-29 37-38 26 44-55 23" fill="#ed9caf"/><circle cx="257" cy="87" r="22" fill="#ed9caf"/></>;
  if(name==='Meruem') return <><path d="M103 220q-8-126 151-160 158 30 155 160-44-41-97-33-29 12-58 38-31-26-60-38-52-8-91 33Z" fill="#6f9471"/><path d="M160 121 94 21l14 130m244-30 66-100-14 130" fill="#6f9471" stroke="#466d55" strokeWidth="7"/><path d="M217 181q38-20 77 0" stroke="#a3c587" strokeWidth="12" fill="none"/></>;
  if(name==='Nezuko Kamado') return <path d="M342 151q34-25 55 10-18 33-54 13Z" fill="#ef96a7"/>;
  return null;
}
