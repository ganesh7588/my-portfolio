"""White-label the case-study screenshots.

Paints over every client logo and client name inside the images and draws the
codename wordmark in its place. Run once against the original screenshots:

    python3 scripts/whitelabel-images.py <originals-dir> src/assets/img

The originals directory uses the codename folder names (nivara/, mahali/, aster360/);
keep the unbranded originals out of this repository.
Needs Pillow and the Inter font (Debian: fonts-inter).
"""
import sys, os, statistics
from PIL import Image, ImageDraw, ImageFont

SRC, DST = sys.argv[1], sys.argv[2]
FONT = "/usr/share/fonts/opentype/inter/Inter-{}.otf"
NAVY, RED, CRIMSON, ORANGE, PURPLE = (31, 72, 139), (214, 40, 57), (213, 0, 50), (247, 160, 52), (128, 42, 110)


def font(weight, size):
    return ImageFont.truetype(FONT.format(weight), max(4, int(size)))


def clear(im, box, pad=1, color=None, both=False):
    """Fill a box row by row, interpolating between the pixels just left and right of it,
    so gradients and dark card faces stay continuous. color= fills flat; both=True also
    blends a top-to-bottom interpolation, which hides the patch better over photos."""
    x0, y0, x1, y1 = box
    if color:
        ImageDraw.Draw(im).rectangle([x0, y0, x1 - 1, y1 - 1], fill=color)
        return
    px = im.load()
    W, H = im.size
    if both:
        top = [px[x, max(0, y0 - pad)] for x in range(x0, x1)]
        bot = [px[x, min(H - 1, y1 + pad)] for x in range(x0, x1)]
    for y in range(max(0, y0), min(H, y1)):
        lx, rx = max(0, x0 - pad), min(W - 1, x1 + pad)
        L = [px[max(0, lx - k), y] for k in range(3)]
        R = [px[min(W - 1, rx + k), y] for k in range(3)]
        l = tuple(int(statistics.median(c)) for c in zip(*L))
        r = tuple(int(statistics.median(c)) for c in zip(*R))
        span = max(1, x1 - x0)
        for x in range(max(0, x0), min(W, x1)):
            t = (x - x0) / span
            c = [l[i] * (1 - t) + r[i] * t for i in range(len(l))]
            if both:
                u = (y - y0) / max(1, y1 - y0)
                v = [top[x - x0][i] * (1 - u) + bot[x - x0][i] * u for i in range(len(l))]
                c = [(c[i] + v[i]) / 2 for i in range(len(l))]
            px[x, y] = tuple(int(k) for k in c)


def text(im, xy, s, size, color, weight="Regular", anchor="lm", spacing=0):
    d = ImageDraw.Draw(im)
    f = font(weight, size)
    if not spacing:
        d.text(xy, s, fill=color, font=f, anchor=anchor)
        return
    x, y = xy
    for ch in s:
        d.text((x, y), ch, fill=color, font=f, anchor="lm")
        x += d.textlength(ch, font=f) + spacing


def fit(s, weight, height, maxw):
    """Largest font size whose text fits height (cap) and width."""
    size = height * 1.35
    while size > 4:
        f = font(weight, size)
        b = f.getbbox(s)
        if b[3] - b[1] <= height and b[2] - b[0] <= maxw:
            return size
        size -= 0.5
    return 4


def retext(im, box, s, color, weight="Regular", size=None):
    """Replace a line of text inside box with s, left aligned."""
    clear(im, box)
    x0, y0, x1, y1 = box
    size = size or fit(s, weight, (y1 - y0) * 0.72, x1 - x0)
    text(im, (x0 + 1, (y0 + y1) / 2), s, size, color, weight)


# ---- wordmarks -----------------------------------------------------------
def nivara(im, box, on_dark=False, tagline=True, color=None):
    clear(im, box, color=color)
    x0, y0, x1, y1 = box
    h = y1 - y0
    main = (255, 255, 255) if on_dark else NAVY
    word_h = h * (0.55 if tagline else 0.8)
    size = fit("nivara", "ExtraBold", word_h, (x1 - x0) * 0.95)
    d = ImageDraw.Draw(im)
    f = font("ExtraBold", size)
    w = d.textlength("nivara", font=f)
    cy = y0 + h * (0.42 if tagline else 0.5)
    d.text((x0, cy), "nivara", fill=main, font=f, anchor="lm")
    if tagline and h >= 18:
        t = "Small Finance Bank"
        ts = fit(t, "Medium", h * 0.2, w)
        d.text((x0 + 1, y1 - h * 0.12), t, fill=(255, 255, 255) if on_dark else RED, font=font("Medium", ts), anchor="lm")


def my360(im, box, on_dark=False, color=None):
    clear(im, box, color=color)
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(im)
    size = fit("MY360", "Black", (y1 - y0) * 0.85, x1 - x0)
    f = font("Black", size)
    cy = (y0 + y1) / 2
    d.text((x0, cy), "MY", fill=(255, 255, 255) if on_dark else (10, 10, 10), font=f, anchor="lm")
    d.text((x0 + d.textlength("MY", font=f), cy), "360", fill=CRIMSON, font=f, anchor="lm")


def aster360(im, box):
    clear(im, box)
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(im)
    size = fit("ASTER360", "BlackItalic", (y1 - y0) * 0.55, x1 - x0)
    f = font("BlackItalic", size)
    cy = (y0 + y1) / 2 + (y1 - y0) * 0.1
    d.text((x0, cy), "ASTER", fill=(255, 255, 255), font=f, anchor="lm")
    d.text((x0 + d.textlength("ASTER", font=f), cy), "360", fill=CRIMSON, font=f, anchor="lm")


def lumora_mark(d, cx, cy, r, ring, dot):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ring, width=max(2, int(r * 0.32)))
    d.ellipse([cx - r * 0.38, cy - r * 0.38, cx + r * 0.38, cy + r * 0.38], fill=dot)


def lumora(im, box, word=PURPLE, accent=ORANGE, mark=ORANGE, both=False):
    clear(im, box, both=both)
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(im)
    h = y1 - y0
    r = h * 0.36
    lumora_mark(d, x0 + r + 1, (y0 + y1) / 2, r, mark, accent)
    tx = x0 + 2 * r + h * 0.35
    size = fit("LUMORA", "Bold", h * 0.38, (x1 - tx) * 0.8)
    f = font("Bold", size)
    x = tx
    for i, ch in enumerate("LUMORA"):
        d.text((x, (y0 + y1) / 2), ch, fill=accent if i >= 4 else word, font=f, anchor="lm")
        x += d.textlength(ch, font=f) + size * 0.12


def lumora_icon(im, box):
    clear(im, box, pad=2)
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(im)
    r = min(x1 - x0, y1 - y0) / 2 * 0.9
    lumora_mark(d, (x0 + x1) / 2, (y0 + y1) / 2, r, (17, 17, 17), ORANGE)


# ---- per-image edits -------------------------------------------------------
def edit(name, fn):
    im = Image.open(os.path.join(SRC, name)).convert("RGB")
    fn(im)
    out = os.path.join(DST, name)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, optimize=True)
    print("wrote", out)


def nivara_cover(im):
    bg = im.getpixel((150, 238))
    nivara(im, (160, 254, 316, 316), color=bg)
    nivara(im, (1512, 266, 1678, 330), color=im.getpixel((1500, 250)))
    clear(im, (282, 846, 306, 861), color=im.getpixel((276, 866))); clear(im, (333, 846, 358, 861), color=im.getpixel((346, 866)))
    text(im, (286, 855.5), "nivara", 7, (230, 236, 248), "Bold")
    text(im, (336, 855.5), "nivara", 7, (240, 240, 240), "Bold")
    retext(im, (1706, 430, 1800, 470), "Nivara", (32, 32, 36), size=24)
    retext(im, (1611, 1145, 1792, 1167), "Nivara Credit Card", (32, 32, 36), size=17)
    clear(im, (1943, 1108, 1982, 1119))
    text(im, (1946, 1113.5), "nivara", 9, (255, 255, 255), "Bold")


def nivara_onboarding(im):
    nivara(im, (702, 436, 768, 462), on_dark=True)
    clear(im, (1243, 435, 1308, 459))
    text(im, (1246, 445), "nivara", 15, (150, 160, 190), "ExtraBold")


def nivara_dashboard(im):
    nivara(im, (74, 198, 156, 228), on_dark=True)


def nivara_family(im):
    nivara(im, (55, 97, 136, 127), on_dark=True)


def nivara_ds(im):
    clear(im, (146, 142, 185, 161), color=im.getpixel((165, 168)))
    text(im, (165, 151.5), "nivara", 12, NAVY, "ExtraBold", anchor="mm")
    retext(im, (140, 184, 192, 195), "Nivara bank", (110, 110, 116), size=8)
    retext(im, (20, 205, 220, 224), "Scan QR via Nivara. earn cashback", (31, 56, 112), "Bold", size=10.5)


def nivara_benchmark(im):
    for b in [(363, 90, 400, 107), (1436, 90, 1475, 107)]:
        clear(im, b)
        text(im, ((b[0] + b[2]) / 2, (b[1] + b[3]) / 2), "nivara", 9, NAVY, "ExtraBold", anchor="mm")
    retext(im, (138, 588, 280, 606), "* Absent in Nivara", (17, 17, 17), size=13)
    retext(im, (1216, 588, 1356, 606), "* Absent in Nivara", (17, 17, 17), size=13)


def mahali_transfer(im):
    retext(im, (22, 114, 122, 123), "One time transfer within Mahali accounts", (60, 60, 70), "Medium", size=5.6)
    retext(im, (166, 103, 196, 111), "Within Mahali", (90, 90, 100), size=4.6)
    retext(im, (160, 256, 190, 264), "Within Mahali", (90, 90, 100), size=4.6)


def mahali_brand(im):
    retext(im, (284, 168, 360, 183), "Within Mahali Bank", (20, 20, 20), "SemiBold", size=7)


def aster_cover(im):
    my360(im, (67, 77, 166, 105), color=(255, 255, 255))
    retext(im, (1044, 315, 1172, 340), "Aster360 Ratings", (30, 34, 40), "Medium", size=17)
    retext(im, (1240, 428, 1656, 450), "\"Most clients rave about Aster360's exceptional customer service", (90, 96, 104), size=14.5)
    retext(im, (108, 186, 162, 207), "My 360", (24, 92, 110), "Medium", size=16)
    aster360(im, (1880, 655, 2002, 702))
    retext(im, (452, 982, 925, 1003), "Complete your goals and get invited to Aster360's accelerate event!", (35, 35, 35), "SemiBold", size=15)
    retext(im, (444, 1040, 826, 1063), "Unlock your invitation to the premier Aster event of the year!", (110, 110, 110), size=14.5)


def aster_dashboards(im):
    my360(im, (49, 69, 128, 92))
    my360(im, (1101, 70, 1182, 94), on_dark=True)
    my360(im, (755, 452, 845, 475))
    aster360(im, (1103, 532, 1232, 569))
    retext(im, (78, 124, 131, 147), "My 360", (110, 110, 116), size=12)
    retext(im, (1131, 126, 1189, 149), "My 360", (225, 225, 228), size=12.5)
    retext(im, (750, 660, 797, 680), "My 360", (30, 30, 34), "Medium", size=13)


def aster_quote(im):
    for b in [(60, 47, 115, 62), (379, 351, 438, 369), (514, 854, 577, 874), (799, 927, 862, 947)]:
        my360(im, b)
    retext(im, (65, 83, 94, 96), "My 360", (120, 120, 126), size=6.5)
    retext(im, (384, 386, 416, 401), "My 360", (120, 120, 126), size=7)


def lumora_app(im):
    lumora(im, (44, 87, 137, 113), both=True)
    lumora(im, (487, 139, 585, 169), word=(255, 255, 255), accent=(255, 255, 255), mark=(255, 255, 255))
    lumora(im, (758, 87, 855, 113))
    retext(im, (437, 647, 636, 667), "Thank you for choosing LUMORA! We", (60, 60, 60), size=13.5)


def lumora_tracker(im):
    lumora_icon(im, (91, 113, 130, 149))
    lumora_icon(im, (1197, 259, 1247, 307))


edit("nivara/cover.png", nivara_cover)
edit("nivara/onboarding.png", nivara_onboarding)
edit("nivara/dashboard.png", nivara_dashboard)
edit("nivara/family-cards.png", nivara_family)
edit("nivara/design-system.png", nivara_ds)
edit("nivara/benchmark.png", nivara_benchmark)
edit("mahali/transfer-flow.png", mahali_transfer)
edit("mahali/brand-states.png", mahali_brand)
edit("aster360/cover.png", aster_cover)
edit("aster360/workflow-maps.png", aster_dashboards)
edit("aster360/ai-capture.png", aster_quote)
edit("aster360/concierge-qa.png", lumora_app)
edit("aster360/inspection-tracker.png", lumora_tracker)
for n in ["mahali/cover.png", "mahali/synthesis.png", "mahali/motion-spec.png", "mahali/home-light.png", "mahali/home-dark.png", "aster360/design-system.png"]:
    edit(n, lambda im: None)
