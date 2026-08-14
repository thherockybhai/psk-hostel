# PSK HOSTEL — Cinematic Landing Page

A dependency-light HTML/CSS/JS recreation of the supplied PSK Hostel reference.

## Run

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replace the three memories

- `assets/memory-01.png` — the supplied reference image is used here.
- The second and third images are currently remote Unsplash placeholders in `index.html`.
- For a production site, replace those two URLs with your own optimized 16:9 photographs.

## Typography

The implementation uses Bebas Neue + Oswald as broadly available web substitutes for the tall condensed reference typography. If you have a licensed Brim Narrow webfont, load it in `styles.css` and put it first in the `.title` font stack.

## Timing

- 0–8s: cinematic camera push
- ~8s: title reveal
- ~10s onward: three-memory loop, ~10s per image
- title/tagline remain fixed while the background memories change

No image counter or progress bar is included.
