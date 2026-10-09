export const hairNames = ['Wavy','Dark bob','Ponytail','Straight bangs','Sakura','Messy','Sweep','Long waves','Shaggy','Side part','Messy bun','Layered bob','Tousled','Spiky','Slick back','Buzz cut','Twin tails','Fluffy','Long fringe','Big waves','Swept fringe','Curly','Pirate tousle','Swordsman spikes','Knight spikes','Soul spikes','Emperor waves','Star hair','Hunter spikes','Silver cloud','Sage topknot','Flame layers','Bubble curls','Flat top','Pompadour','Tower','Butterfly waves','Braided','Boar mane'] as const;
export const outfits = ['Jacket','Turtleneck','Blouse','Sailor','High collar','Shirt','Hero suit','Red vest','Green robe','Black cloak','Soul robe','Royal coat','Long coat','Green jacket','Blue hoodie','Martial tunic'] as const;
export const accessories = ['None','Baseball cap','Beanie','Beret','Conical hat','Crown','Fez','Goggles','Officer cap','Pit vipers','Round glasses','Square glasses','Star clip','Tiara','Trucker hat','Wraparound sunglasses','Straw hat','Black headband','Star cap'] as const;
export const backdrops = ['Ink','Graphite','Charcoal','Cream','Sky','Mint','Sun','Coral','Lavender','Navy','Split','Glow','Halftone','Stripes','Rays','Transparent'] as const;
export const frames = ['Corner peek','Side peek','Bottom peek','Top peek','Close-up','Tilt peek','Half face'] as const;

export const skins = [
  ['Porcelain','#fae2cd'],['Ivory','#fff0e4'],['Blossom','#f4d5ce'],['Apricot','#f4c8b2'],['Peach','#efcfba'],['Sand','#d9ad8d'],['Honey','#c99a77'],['Caramel','#ad795e'],['Bronze','#98684e'],['Cocoa','#79533f'],['Espresso','#4d332b'],['Ocean blue','#6aabc0'],['Chimera green','#99b477']
] as const;
export const blushes = [['Match skin',''],['Rose','#e6a898'],['Petal','#f4bbb2'],['Coral','#ed9688'],['Dusty','#d99e9b']] as const;
export const hairs = [['Chestnut','#64493e'],['Espresso','#332b31'],['Auburn','#a65c40'],['Copper','#ca7c4d'],['Honey','#be9561'],['Platinum','#e8dbb5'],['Silver','#a9aab3'],['Rose','#dd99a2'],['Midnight','#273246'],['Slate','#656d84'],['Soft black','#29272d'],['Sakura','#e8a8bd'],['Teal','#197e91'],['Moss','#4c9e63'],['Butter','#e6c86b'],['Ice','#c8e7ef'],['Flame','#ef9435'],['Gold','#e6bd47'],['Candy pink','#ed92a2'],['Wine red','#832f48'],['Violet','#72558d'],['Electric blue','#3094c2']] as const;
export const outfitColors = [['Graphite','#505154'],['Ink','#24252a'],['Navy','#2f4566'],['Forest','#315d50'],['Wine','#7e4050'],['Camel','#b78056'],['Cream','#ece4d6'],['Cobalt','#4974ca'],['White','#f3f1e9'],['Yellow','#f5c753'],['Crimson','#c34246'],['Emerald','#35845a'],['Azure','#5897cf'],['Orange','#df773f'],['Pink','#df809e'],['Violet','#785f9e']] as const;

export type AvatarState = {
  head: string; size: string; skin: string; blush: string; character: string;
  hair: string; hairColor: string; outfit: string; outfitColor: string;
  accessory: string; held: string; facialHair: string; special: boolean; anime: string;
  backdrop: string; frame: string;
};

export const initialAvatar: AvatarState = {
  head:'Classic', size:'Medium', skin:'Porcelain', blush:'Match skin', character:'Bot',
  hair:'Pirate tousle', hairColor:'Soft black', outfit:'Red vest', outfitColor:'Crimson',
  accessory:'Straw hat', held:'Nothing held', facialHair:'None', special:false, anime:'Monkey D Luffy',
  backdrop:'Sky', frame:'Corner peek'
};

export const classicAvatar: AvatarState = {
  head:'Classic', size:'Medium', skin:'Porcelain', blush:'Match skin', character:'Bot',
  hair:'Wavy', hairColor:'Chestnut', outfit:'Jacket', outfitColor:'Graphite',
  accessory:'None', held:'Nothing held', facialHair:'None', special:false, anime:'',
  backdrop:'Ink', frame:'Corner peek'
};

export { animePresets, animeCollections } from './anime-data';

export const looks: {name:string; changes:Partial<AvatarState>}[] = [
  {name:'Ponytail', changes:{anime:'',hair:'Ponytail',hairColor:'Midnight',outfit:'Jacket',outfitColor:'Navy',accessory:'None'}},
  {name:'Dark bob', changes:{hair:'Dark bob',hairColor:'Slate',outfit:'Turtleneck'}},
  {name:'Bangs', changes:{hair:'Straight bangs',hairColor:'Espresso',outfit:'Blouse'}},
  {name:'Sakura', changes:{hair:'Sakura',hairColor:'Sakura',backdrop:'Coral'}},
  {name:'Ice', changes:{hair:'Sweep',hairColor:'Ice',backdrop:'Sky'}},
  {name:'Teal', changes:{hair:'Long waves',hairColor:'Teal',backdrop:'Navy'}},
  {name:'Sailor', changes:{hair:'Straight bangs',hairColor:'Teal',outfit:'Sailor'}},
  {name:'Long bangs', changes:{hair:'Long fringe',hairColor:'Espresso'}},
  {name:'Blonde', changes:{hair:'Side part',hairColor:'Butter'}},
  {name:'Honey', changes:{hair:'Fluffy',hairColor:'Honey'}}
];

export const lookup = (list: readonly (readonly [string,string])[], name: string, fallback: string) => list.find(([label])=>label===name)?.[1] ?? fallback;

export function randomAvatar(): AvatarState {
  const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random()*items.length)];
  return {
    head:pick(['Classic','Mochi','Squircle','Pebble']), size:pick(['Small','Medium','Large']), skin:pick(skins)[0], blush:pick(blushes)[0], character:pick(['Bot','Ghost','Cat','Muni']),
    hair:pick(hairNames), hairColor:pick(hairs)[0], outfit:pick(outfits), outfitColor:pick(outfitColors)[0],
    accessory:pick(accessories), held:pick(['Nothing held','Sweet potato']), facialHair:pick(['None','Curly mustache','Full beard']), special:false, anime:'',
    backdrop:pick(backdrops.filter(x=>x!=='Transparent')), frame:pick(frames)
  };
}
