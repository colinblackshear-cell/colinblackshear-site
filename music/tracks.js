/* The radio's stations, in dial order.
   To add a song: put the audio file (mp3 or m4a) in music/tracks/ and add a line like
     { title: 'Song name', note: '2026', src: 'tracks/song-name.mp3' },
   `freq` (88–108) pins a station to a spot on the dial; leave it out and stations spread evenly.
   Entries with `demo` are synthesized placeholders, to be replaced by real tracks. */
window.TRACKS = [
  { title: 'Late Bloom', note: 'Placeholder', demo: { bpm: 96, chords: [[53, 57, 60, 64], [53, 59, 64, 67], [52, 55, 59, 62], [55, 60, 64, 71]], roots: [38, 43, 36, 45] } },
  { title: 'Avocado Sun', note: 'Placeholder', demo: { bpm: 104, chords: [[55, 59, 62, 66], [57, 60, 64, 67], [52, 55, 59, 64], [54, 57, 61, 64]], roots: [43, 45, 40, 42] } },
  { title: 'Night Static', note: 'Placeholder', demo: { bpm: 84, chords: [[50, 53, 57, 60], [48, 52, 55, 59], [46, 50, 53, 57], [45, 49, 52, 57]], roots: [38, 36, 34, 33] } },
];
