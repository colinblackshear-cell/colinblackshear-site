# colinblackshear.com

Colin Blackshear's site. Visitors land on a 3D 1970s TV that powers on and plays a reel. A channel dial flips between films and music.

- `index.html` holds the whole site for now: the 3D set (Three.js), the channels, and the sound.
- The films are streamed from Vimeo. Each channel's entry in the `WORKS` list takes a `vimeo` id.
- Every push to `main` deploys to GitHub Pages.

## Interactive lab

`lab/` holds the Interactive section. Each experiment lives in its own folder (`lab/808/`, `lab/bardo/`) and gets one entry in `lab/experiments.js`, which the lab index reads. To add an experiment, drop a folder in and add an entry; `status: 'soon'` shows a placeholder.
