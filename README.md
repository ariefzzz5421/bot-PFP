# bot pfp

A customizable, client-side avatar maker inspired by the interaction and layout of [botpfp.com](https://botpfp.com/). The implementation and SVG artwork in this repository are original, so you can edit them freely. It does not use the reference site's source code or bundled assets.

## Run locally

```bash
npm install
npm run dev
```

For a production build, run `npm run build`. Vercel can deploy this Vite project with its default settings (`dist` output).

## Features

- Head, character, skin, blush, hair, outfit, accessory, backdrop, and frame controls
- Live SVG preview with ten preset looks
- Anime menu with 52 editable character PFPs across One Piece (10), Bleach (11), JoJo's Bizarre Adventure (10), Hunter × Hunter (10), and Demon Slayer (11). Asta remains in a bonus Black Clover section. Luffy is the starting look, and the classic bot remains selectable.
- Series filters and character search in the Anime menu
- Randomize, undo, and redo
- Nine-frame photobooth sheet
- Shareable URL containing the current choices
- PNG downloads at 1024 or 2048 pixels, SVG download, and PNG clipboard copy
- Responsive layout for phones, tablets, and desktop

## Customize

| Change | File |
| --- | --- |
| Option names, colors, initial avatar | `src/data.ts` |
| Anime collections and character defaults | `src/anime-data.ts` |
| Avatar illustration, backgrounds, frame positions, photobooth | `src/Avatar.tsx` |
| Character-specific SVG marks, headwear, and costumes | `src/AnimeArt.tsx` |
| Controls, editor behavior, downloads | `src/App.tsx` |
| Colors, spacing, responsive layout | `src/styles.css` |

All editing happens in the browser. There is no account, database, or server-side image processing. A shared link stores the choices in its URL, so changing option names later may change how older links render. If you add a setting, add it to `AvatarState` and `initialAvatar` in `src/data.ts`, then render its control and illustration.

The anime PFPs are original fan-art interpretations made from editable SVG shapes. They do not bundle official character images or logos. The curated character lists were checked against the [One Piece character index](https://one-piece.com/character/), [Bleach character page](https://bleach-anime.com/character/), [JoJo anime portal](https://jojo-portal.com/en/anime/), [VIZ Hunter × Hunter overview](https://www.viz.com/blog/posts/welcome-to-hunter-x-hunter), and [Demon Slayer character page](https://kimetsu.com/anime/risshihen/character/). These are selected main and popular characters, not every named character in each franchise.
