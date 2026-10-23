"""Copy the Many Doors pages into lab/many-doors/ and point their links at the site.

The pages are built in the Spirit Project (engine + one folder per book, see its build_all.py
and build_hub.py), which writes self-contained pages plus a books.json manifest. This script
takes that output and lays it out on the site:

  lab/many-doors/                  the hub: a visual intro, then a hall of doors
  lab/many-doors/<folder>/         a book's journey, the short click-through version
  lab/many-doors/<folder>/book/    a book's manual, the full illustrated book
  lab/many-doors/<folder>/walk/    a book's walk
  lab/many-doors/atlas/            the atlas of twenty-six traditions
  lab/many-doors/doors/            the capstone book (manual only, so it keeps its folder)
  lab/many-doors/tibetan/          the Tibetan pair, kept by hand (not built in the Spirit Project)

To add a book: rebuild in the Spirit Project, then run
  python3 tools/many-doors.py /path/to/spirit-books
and commit. Nothing here needs editing; new entries in books.json come along on their own.
"""
import json, os, re, sys

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SITE, 'lab', 'many-doors')

# The page skeleton the claude.ai pages were written against.
HEAD = '''<!doctype html><html lang="en"><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
'''
# Links between pages of the series open in the same tab; outside links keep their new tab.
SAME_TAB = '''<script>document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[target=_blank]');if(a&&a.origin===location.origin)a.removeAttribute('target')},true)</script>
'''
# The atlas sits behind the hub's last door, so it gets a way back to the doors.
BACK = '''<a href="{up}" style="position:fixed;left:12px;bottom:12px;z-index:50;font:500 12px/1 Jost,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#1E2A2B;background:#FBF3DFe6;border:1px solid rgba(30,42,43,.25);border-radius:999px;padding:9px 13px;text-decoration:none">&larr; {label}</a>
'''


def main(src):
    pages = os.path.join(src, 'pages')
    m = json.load(open(os.path.join(src, 'books.json')))

    # site path (from lab/) for every claude.ai artifact the pages link to; the atlas's old link now means the hub
    where = {m['atlas']['artifact']: 'many-doors/'}
    where[m['tibetan']['manual']] = 'many-doors/tibetan/'
    where[m['tibetan']['walk']] = 'many-doors/tibetan/walk/'
    jobs = [(m['atlas']['file'], 'many-doors/atlas/')]
    for b in m['books']:
        has_journey = 'journey' in b
        for kind in ('manual', 'walk', 'journey'):
            if kind not in b: continue
            path = f"many-doors/{b['folder']}/" + {'walk': 'walk/', 'manual': 'book/' if has_journey else '', 'journey': ''}[kind]
            if 'artifact' in b[kind]: where[b[kind]['artifact']] = path
            jobs.append((b[kind]['file'], path))

    for file, path in jobs:
        html = open(os.path.join(pages, file)).read()
        up = '../' * path.count('/')  # back to lab/
        html = re.sub(r'<meta name="claude:[^>]*>\n?', '', html)
        for url, to in where.items():
            html = html.replace(url, up + to)
        left = sorted(set(re.findall(r'https://claude\.ai/artifact/\w+', html)))
        if left: print(f'  {file}: no site page for {", ".join(left)}')
        extra = SAME_TAB + (BACK.format(up='../#doors', label='All doors') if path == 'many-doors/atlas/' else '')
        write(path, HEAD + html.rstrip() + '\n' + extra + '</body></html>\n')
        print(f'lab/{path} <- {file}')

    # the hub is a whole page already
    write('many-doors/', open(os.path.join(pages, m['hub']['file'])).read())
    print(f"lab/many-doors/ <- {m['hub']['file']}")


def write(path, html):
    dest = os.path.join(SITE, 'lab', path, 'index.html')
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, 'w').write(html)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '/mnt/project-files/spirit-books')
