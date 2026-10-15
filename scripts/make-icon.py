# Renders docs/images/icon-512.png and icon-256.png: the same shapes as icon.svg, supersampled 4x.
# Needs Pillow:  python scripts/make-icon.py
from PIL import Image, ImageDraw

S = 4
EMBER, DEEP, INK = (232, 130, 58, 255), (156, 74, 20, 255), (28, 13, 4, 255)

def render(size):
    img = Image.new('RGBA', (512 * S, 512 * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = lambda x, y, w, h, c: d.rectangle([x * S, y * S, (x + w) * S - 1, (y + h) * S - 1], fill=c)
    r(72, 72, 400, 400, DEEP)       # hard offset shadow
    r(40, 40, 400, 400, DEEP)       # border
    r(52, 52, 376, 376, EMBER)      # fill
    # prompt chevron ">" with square ends and a mitred point (same polygon as icon.svg)
    poly = [(105, 140), (105 + 46, 140), (230, 240), (105 + 46, 340), (105, 340), (189, 240)]
    d.polygon([(x * S, y * S) for x, y in poly], fill=INK)
    r(285, 140, 100, 200, INK)      # block cursor, 1 : 2
    return img.resize((size, size), Image.LANCZOS)

render(512).save('docs/images/icon-512.png')
render(256).save('docs/images/icon-256.png')
