#!/usr/bin/env bash
# Builds a watermarked, image-only PDF (plus preview thumbnail) for a project spotlight.
# Every page is rasterized at the same DPI and stamped, then reassembled into a PDF
# so each page keeps its original size and no text can be selected or extracted.
# Keep the source PDF out of public/ so the unwatermarked original is never served.
# Usage: scripts/build-protected-pdf.sh <src.pdf> <out dir> <name> [dpi=90] [thumb page=last]
#   e.g. scripts/build-protected-pdf.sh assets-src/poster.pdf public/assets/img/projects/MesoNet poster
# Requires poppler (pdftoppm), cwebp and Python with Pillow.
set -euo pipefail
PDF=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
OUT=$2
NAME=$3
DPI=${4:-90}
THUMB_PAGE=${5:-}
cd "$(dirname "$0")/.."

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

pdftoppm -jpeg -jpegopt quality=95 -r $DPI "$PDF" "$TMP/p"
python3 scripts/watermark.py "$TMP"/p-*.jpg

# Random names so the files can't be guessed
DOC=$NAME-$(openssl rand -hex 8).pdf
THUMB=$NAME-thumb-$(openssl rand -hex 8).webp

python3 - "$TMP" "$OUT/$DOC" $DPI <<'EOF'
import glob, sys
from PIL import Image
tmp, out, dpi = sys.argv[1], sys.argv[2], float(sys.argv[3])
pages = [Image.open(p).convert("RGB") for p in sorted(glob.glob(f"{tmp}/p-*.jpg"))]
pages[0].save(out, save_all=True, append_images=pages[1:], resolution=dpi, quality=80)
EOF

if [ -n "$THUMB_PAGE" ]; then
  COVER=$(ls "$TMP"/p-*.jpg | sort -V | sed -n "${THUMB_PAGE}p")
else
  COVER=$(ls "$TMP"/p-*.jpg | sort -V | tail -1)
fi
cwebp -quiet -q 70 -resize 0 300 "$COVER" -o "$OUT/$THUMB"
echo "$OUT/$DOC"
echo "$OUT/$THUMB"
