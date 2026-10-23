# colinblackshear.com

Colin Blackshear's site. Visitors land on a 3D 1970s TV that powers on and plays a reel. A channel dial flips between films and music.

- `index.html` holds the whole site for now: the 3D set (Three.js), the channels, and the sound.
- The films are streamed from Vimeo. Each channel's entry in the `WORKS` list takes a `vimeo` id.
- Every push to `main` deploys to GitHub Pages.

## Interactive lab

`lab/` holds the Interactive section. Each experiment lives in its own folder (`lab/808/`, `lab/many-doors/`) and gets one entry in `lab/experiments.js`, which the lab index reads. To add an experiment, drop a folder in and add an entry; `status: 'soon'` shows a placeholder.

### Many Doors

`lab/many-doors/` is the Many Doors series. The hub (`lab/many-doors/`) is a short visual intro and then a hall of doors, one per tradition. Behind each door is a journey, a few minutes of click-through at `lab/many-doors/<book>/`, with the full illustrated book at `<book>/book/` and the daily walk at `<book>/walk/`. The atlas of twenty-six traditions is at `atlas/` and the capstone book at `doors/`. The Tibetan pair (The Bardo Manual and The Forty-Nine Day Walk) is at `lab/many-doors/tibetan/` and `tibetan/walk/`; those two are kept by hand. `lab/bardo/` only redirects there, for old links. The pages are built in the Spirit Project, not by hand here. To add or update books, run `python3 tools/many-doors.py <spirit-books folder>`, which copies every page in its `books.json` and points the links between them at the site. Bump `doors` in the lab entry when the shelf grows.
