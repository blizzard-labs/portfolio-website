"""Stamps a diagonal name watermark onto each page image in place.

Usage: python3 scripts/watermark.py <image> [<image> ...]
"""
import math
import sys

from PIL import Image, ImageDraw, ImageFont

TEXT = "Krishna Bhatt"
FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
OPACITY = 60  # 0-255


def watermark(path):
    page = Image.open(path).convert("RGB")
    w, h = page.size
    angle = math.degrees(math.atan2(h, w))
    diagonal = math.hypot(w, h)

    # Size the text to span ~75% of the page diagonal
    font = ImageFont.truetype(FONT, 100)
    text_w = font.getlength(TEXT)
    font = ImageFont.truetype(FONT, int(100 * diagonal * 0.75 / text_w))

    layer = Image.new("RGBA", (int(diagonal), int(diagonal)), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    center = (layer.width / 2, layer.height / 2)
    draw.text(center, TEXT, font=font, anchor="mm", fill=(90, 90, 90, OPACITY))
    layer = layer.rotate(angle, resample=Image.BICUBIC)

    left, top = (layer.width - w) // 2, (layer.height - h) // 2
    stamped = page.convert("RGBA")
    stamped.alpha_composite(layer.crop((left, top, left + w, top + h)))
    stamped.convert("RGB").save(path, quality=95)


if __name__ == "__main__":
    for p in sys.argv[1:]:
        watermark(p)
