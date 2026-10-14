#!/usr/bin/env bash
# Builds watermarked page images for the Notebook viewer from a source PDF.
# Keep the source PDF out of public/ so the unwatermarked original is never served.
# Usage: scripts/build-notebook.sh path/to/notebook.pdf
# Requires poppler (pdftoppm), cwebp and Python with Pillow.
set -euo pipefail
PDF=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
cd "$(dirname "$0")/.."

OUT=public/assets/notebook
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

rm -rf "$OUT" && mkdir -p "$OUT/pages" "$OUT/thumbs"

pdftoppm -jpeg -jpegopt quality=95 -scale-to-y 1800 -scale-to-x -1 "$PDF" "$TMP/p"
python3 scripts/watermark.py "$TMP"/p-*.jpg

i=0
for f in $(ls "$TMP"/p-*.jpg | sort -V); do
  i=$((i + 1))
  n=$(printf '%03d' "$i")
  cwebp -quiet -q 72 "$f" -o "$OUT/pages/$n.webp"
  cwebp -quiet -q 60 -resize 0 220 "$f" -o "$OUT/thumbs/$n.webp"
done

echo "Rendered $i pages"
python3 scripts/obfuscate-notebook.py "$OUT"
