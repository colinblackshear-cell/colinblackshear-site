/* The radio's stations, in dial order.
   To add a song: put the audio file (mp3 or m4a) in music/tracks/ and add a line like
     { title: 'Song name', note: '2026', src: 'tracks/song-name.mp3' },
   `freq` (88–108) pins a station to a spot on the dial; leave it out and stations spread evenly.
   Entries with `demo` are synthesized placeholders, to be replaced by real tracks. */
window.TRACKS = [
  { title: 'Rinsginse', note: '2:43', src: 'tracks/rinsginse.mp3' },
  { title: 'Zrrrgg', note: '2:11', src: 'tracks/zrrrgg.mp3' },
  { title: 'Wiird', note: '1:38', src: 'tracks/wiird.mp3' },
  { title: 'Antarctic', note: '1:41', src: 'tracks/antarctic.mp3' },
  { title: 'Dring', note: '4:16', src: 'tracks/dring.mp3' },
  { title: 'Playgrnd', note: '2:15', src: 'tracks/playgrnd.mp3' },
  { title: 'Rooer', note: '0:57', src: 'tracks/rooer.mp3' },
  { title: 'Samurais', note: '1:51', src: 'tracks/samurais.mp3' },
];
