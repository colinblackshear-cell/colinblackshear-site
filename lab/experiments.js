// The lab grows by adding a folder under lab/ and one entry here.
// object: how it appears in the room ('machine', 'book', 'doors', or leave it out for a plain card). Every piece gets the same footprint on the table.
// status: 'live' links to the folder; 'soon' shows a quiet placeholder.
window.EXPERIMENTS = [
  {
    slug: 'many-doors',
    title: 'Many Doors',
    no: '01',
    status: 'live',
    object: 'doors',
    doors: 12, // one per book in the series, the Bardo included
    blurb: 'What happens after we die, according to everyone. Pick one of twelve doors and click through a few minutes of the afterlife it promises.',
    also: [{ label: 'The atlas', href: 'many-doors/atlas/', note: 'twenty-six traditions side by side' }],
  },
  {
    slug: '808',
    title: 'Rhythm Composer',
    no: '02',
    status: 'live',
    object: 'machine',
    blurb: 'A sixteen-step drum machine in the spirit of the 808, with sixteen voices, an effects unit, a sampler for your own sounds, and WAV download.',
  },
];
