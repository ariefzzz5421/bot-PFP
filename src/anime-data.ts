import type { AvatarState } from './data';

export const animeCollections = [
  'ONE PIECE', 'BLEACH', 'JOJO’S BIZARRE ADVENTURE',
  'HUNTER × HUNTER', 'DEMON SLAYER', 'BONUS'
] as const;

type Series = typeof animeCollections[number];
export type AnimePreset = { name: string; series: Series; subtitle: string; changes: Partial<AvatarState> };

function portrait(name:string, series:Series, subtitle:string, hair:string, hairColor:string, outfit:string, outfitColor:string, skin:string, backdrop:string, extras:Partial<AvatarState>={}):AnimePreset {
  return {name,series,subtitle,changes:{anime:name,head:'Classic',character:'Bot',size:'Medium',blush:'Match skin',hair,hairColor,outfit,outfitColor,skin,backdrop,frame:'Corner peek',accessory:'None',held:'Nothing held',facialHair:'None',special:false,...extras}};
}

// Original, editable vector portraits inspired by the official character lineups.
export const animePresets:AnimePreset[] = [
  portrait('Monkey D Luffy','ONE PIECE','Straw Hat captain','Pirate tousle','Soft black','Red vest','Crimson','Porcelain','Sky',{accessory:'Straw hat'}),
  portrait('Roronoa Zoro','ONE PIECE','Three-sword fighter','Swordsman spikes','Moss','Green robe','Emerald','Peach','Mint'),
  portrait('Nami','ONE PIECE','Navigator','Long waves','Flame','Blouse','Azure','Apricot','Sun'),
  portrait('Usopp','ONE PIECE','Sniper','Curly','Soft black','Jacket','Camel','Bronze','Coral'),
  portrait('Sanji','ONE PIECE','Cook','Swept fringe','Gold','Jacket','Ink','Porcelain','Cream'),
  portrait('Tony Tony Chopper','ONE PIECE','Ship doctor','Fluffy','Chestnut','Blue hoodie','Pink','Apricot','Sky'),
  portrait('Nico Robin','ONE PIECE','Archaeologist','Long fringe','Soft black','Jacket','Violet','Sand','Lavender'),
  portrait('Franky','ONE PIECE','Cyborg shipwright','Flat top','Electric blue','Shirt','Crimson','Peach','Sky'),
  portrait('Brook','ONE PIECE','Soul king','Fluffy','Soft black','Long coat','Ink','Espresso','Navy'),
  portrait('Jinbe','ONE PIECE','Helmsman','Slick back','Midnight','Green robe','Orange','Ocean blue','Mint'),

  portrait('Kurosaki Ichigo','BLEACH','Substitute Soul Reaper','Soul spikes','Flame','Soul robe','Ink','Apricot','Coral'),
  portrait('Rukia Kuchiki','BLEACH','Soul Reaper','Dark bob','Soft black','Soul robe','Ink','Porcelain','Lavender'),
  portrait('Orihime Inoue','BLEACH','Healer','Long waves','Copper','Blouse','White','Porcelain','Coral'),
  portrait('Uryu Ishida','BLEACH','Quincy archer','Side part','Soft black','Royal coat','White','Ivory','Sky',{accessory:'Square glasses'}),
  portrait('Renji Abarai','BLEACH','Sixth Division lieutenant','Braided','Wine red','Soul robe','Ink','Apricot','Coral'),
  portrait('Byakuya Kuchiki','BLEACH','Sixth Division captain','Long fringe','Soft black','Soul robe','Ink','Porcelain','Lavender'),
  portrait('Toshiro Hitsugaya','BLEACH','Tenth Division captain','Knight spikes','Silver','Soul robe','Ink','Ivory','Sky'),
  portrait('Kenpachi Zaraki','BLEACH','Eleventh Division captain','Spiky','Soft black','Soul robe','Ink','Sand','Glow'),
  portrait('Kisuke Urahara','BLEACH','Inventor','Shaggy','Butter','Green robe','Forest','Porcelain','Mint'),
  portrait('Yoruichi Shihouin','BLEACH','Flash Goddess','Ponytail','Violet','Hero suit','Orange','Bronze','Lavender'),
  portrait('Yhwach','BLEACH','Quincy king','Emperor waves','Soft black','Royal coat','White','Sand','Navy',{facialHair:'Full beard'}),

  portrait('Jonathan Joestar','JOJO’S BIZARRE ADVENTURE','Phantom Blood','Tousled','Midnight','Long coat','Cobalt','Peach','Sky'),
  portrait('Joseph Joestar','JOJO’S BIZARRE ADVENTURE','Battle Tendency','Spiky','Chestnut','High collar','Forest','Peach','Sun'),
  portrait('Kujo Jotaro','JOJO’S BIZARRE ADVENTURE','Star Platinum','Star hair','Soft black','Long coat','Ink','Peach','Lavender',{accessory:'Star cap'}),
  portrait('Josuke Higashikata','JOJO’S BIZARRE ADVENTURE','Diamond Is Unbreakable','Pompadour','Soft black','Long coat','Navy','Peach','Sky'),
  portrait('Giorno Giovanna','JOJO’S BIZARRE ADVENTURE','Golden Wind','Bubble curls','Gold','Long coat','Pink','Porcelain','Sun'),
  portrait('Jolyne Cujoh','JOJO’S BIZARRE ADVENTURE','Stone Ocean','Braided','Moss','Hero suit','Emerald','Peach','Mint'),
  portrait('DIO','JOJO’S BIZARRE ADVENTURE','The World','Emperor waves','Gold','Hero suit','Yellow','Porcelain','Sun'),
  portrait('Noriaki Kakyoin','JOJO’S BIZARRE ADVENTURE','Hierophant Green','Swept fringe','Wine red','Long coat','Emerald','Peach','Coral'),
  portrait('Jean Pierre Polnareff','JOJO’S BIZARRE ADVENTURE','Silver Chariot','Tower','Silver','Hero suit','White','Porcelain','Lavender'),
  portrait('Bruno Bucciarati','JOJO’S BIZARRE ADVENTURE','Passione leader','Straight bangs','Soft black','Long coat','White','Peach','Navy'),

  portrait('Gon Freecss','HUNTER × HUNTER','Rookie Hunter','Hunter spikes','Soft black','Green jacket','Emerald','Apricot','Sun'),
  portrait('Killua Zoldyck','HUNTER × HUNTER','Lightning Hunter','Silver cloud','Ice','Blue hoodie','Azure','Ivory','Sky'),
  portrait('Kurapika','HUNTER × HUNTER','Scarlet Eyes','Layered bob','Gold','Martial tunic','Cobalt','Porcelain','Lavender'),
  portrait('Leorio Paradinight','HUNTER × HUNTER','Aspiring doctor','Side part','Soft black','Jacket','Ink','Peach','Sky',{accessory:'Round glasses'}),
  portrait('Hisoka Morow','HUNTER × HUNTER','Magician','Slick back','Wine red','Hero suit','Violet','Ivory','Coral'),
  portrait('Netero','HUNTER × HUNTER','Hunter chairman','Sage topknot','Silver','Martial tunic','Cream','Sand','Glow',{facialHair:'Full beard'}),
  portrait('Chrollo Lucilfer','HUNTER × HUNTER','Phantom Troupe leader','Slick back','Soft black','Long coat','Ink','Porcelain','Navy'),
  portrait('Illumi Zoldyck','HUNTER × HUNTER','Assassin','Long fringe','Soft black','High collar','Ink','Porcelain','Graphite'),
  portrait('Biscuit Krueger','HUNTER × HUNTER','Master Hunter','Twin tails','Gold','Blouse','Pink','Porcelain','Sun'),
  portrait('Meruem','HUNTER × HUNTER','Chimera Ant king','Slick back','Moss','Hero suit','Forest','Chimera green','Mint'),

  portrait('Tanjiro Kamado','DEMON SLAYER','Water Breathing','Shaggy','Wine red','Green robe','Emerald','Peach','Mint'),
  portrait('Nezuko Kamado','DEMON SLAYER','Demon sister','Long waves','Soft black','Martial tunic','Pink','Porcelain','Coral'),
  portrait('Zenitsu Agatsuma','DEMON SLAYER','Thunder Breathing','Layered bob','Gold','Martial tunic','Yellow','Porcelain','Sun'),
  portrait('Inosuke Hashibira','DEMON SLAYER','Beast Breathing','Boar mane','Midnight','Martial tunic','Navy','Peach','Sky'),
  portrait('Giyu Tomioka','DEMON SLAYER','Water Hashira','Long fringe','Soft black','Soul robe','Navy','Peach','Sky'),
  portrait('Shinobu Kocho','DEMON SLAYER','Insect Hashira','Butterfly waves','Violet','Soul robe','White','Porcelain','Lavender'),
  portrait('Kyojuro Rengoku','DEMON SLAYER','Flame Hashira','Flame layers','Gold','Soul robe','White','Peach','Sun'),
  portrait('Tengen Uzui','DEMON SLAYER','Sound Hashira','Long waves','Silver','Soul robe','Ink','Peach','Navy'),
  portrait('Mitsuri Kanroji','DEMON SLAYER','Love Hashira','Braided','Candy pink','Soul robe','White','Porcelain','Coral'),
  portrait('Muichiro Tokito','DEMON SLAYER','Mist Hashira','Long fringe','Soft black','Soul robe','Ink','Porcelain','Mint'),
  portrait('Muzan Kibutsuji','DEMON SLAYER','Demon king','Curly','Soft black','Long coat','Ink','Porcelain','Graphite'),

  portrait('Asta','BONUS','Black Clover · Magic Knight','Knight spikes','Silver','Black cloak','Ink','Peach','Glow',{accessory:'Black headband'})
];
