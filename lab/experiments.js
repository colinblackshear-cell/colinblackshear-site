// The lab grows by adding a folder under lab/ and one entry here.
// object: how it appears in the room ('machine', 'book', 'doors', or leave it out for a plain card).
// status: 'live' links to the folder; 'soon' shows a quiet placeholder.
window.EXPERIMENTS = [
  {
    slug: '808',
    title: 'Rhythm Composer',
    no: '01',
    status: 'live',
    object: 'machine',
    blurb: 'A sixteen-step drum machine in the spirit of the 808, with a sampler for your own sounds.',
  },
  {
    slug: 'bardo',
    title: 'The Bardo Manual',
    no: '02',
    status: 'live',
    object: 'book',
    blurb: 'The Tibetan Book of the Dead, told as an illustrated flight through the in-between.',
    also: [{ label: 'The Forty-Nine Day Walk', href: 'bardo/49-days/', note: 'the slip in the book: walk all forty-nine days, one stone at a time' }],
  },
  {
    slug: 'many-doors',
    title: 'Many Doors',
    no: '03',
    status: 'live',
    object: 'doors',
    doors: 12, // one per book in the series, the Bardo included
    blurb: 'What the world\'s traditions say happens after we die: an atlas of twenty-six of them, and a shelf of illustrated books you can walk through day by day.',
    also: [{ label: 'Many Doors, the book', href: 'many-doors/doors/', note: 'every tradition side by side, one step at a time' }],
  },
];
