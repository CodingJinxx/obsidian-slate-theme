# Rebuilds fonts/JetBrainsMono-400.woff2 and -700.woff2 from the full font files, keeping only
# Latin, Latin-1, common punctuation, the euro sign and arrows, with no layout features
# (ligatures are off in the theme) and no hinting. This keeps theme.css small.
#
#   pip install fonttools brotli
#   python scripts/subset-fonts.py <folder with the full JetBrainsMono-400.woff2 and -700.woff2>
import subprocess
import sys

UNICODES = 'U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+20AC,U+2190-2193,U+2212'

source = sys.argv[1]
for weight in (400, 700):
    subprocess.run(
        [
            'pyftsubset', f'{source}/JetBrainsMono-{weight}.woff2',
            f'--unicodes={UNICODES}', '--layout-features=', '--no-hinting', '--desubroutinize',
            '--flavor=woff2', f'--output-file=fonts/JetBrainsMono-{weight}.woff2',
        ],
        check=True,
    )
