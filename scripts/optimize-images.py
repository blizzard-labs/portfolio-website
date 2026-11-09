"""Generate checked-in responsive assets. Requires macOS sips and cwebp (brew install webp).

Run after changing public images: python3 scripts/optimize-images.py
Normal builds use the committed output and need no image tooling.
"""
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sources = set()
for path in (ROOT / 'src').rglob('*'):
    if path.suffix in {'.js', '.jsx'}:
        sources.update(re.findall(r'/assets/img/[^\s"\'<>]+\.(?:png|jpe?g)', path.read_text()))

output = ROOT / 'public/assets/img/optimized'
output.mkdir(exist_ok=True)
manifest = {}
original_bytes = optimized_bytes = 0
for src in sorted(sources):
    source = ROOT / 'public' / src.lstrip('/')
    if not source.is_file():
        print(f'Skipping missing legacy image: {src}')
        continue
    info = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'orientation', str(source)], text=True)
    width = int(re.search(r'pixelWidth: (\d+)', info)[1])
    height = int(re.search(r'pixelHeight: (\d+)', info)[1])
    orientation = re.search(r'orientation: (\d+)', info)
    if orientation and orientation[1] != '1':
        raise ValueError(f'Normalize EXIF rotation before generating: {source}')
    quality = '90' if '/projects/' in src or 'tractogram' in src else '82'
    digest = hashlib.sha256(source.read_bytes() + f'webp-v2-icc-{quality}'.encode()).hexdigest()[:12]
    variants = []
    for target in sorted({min(width, size) for size in (320, 640, 1280, 1920)}):
        filename = f'{source.stem}-{digest}-{target}.webp'
        destination = output / filename
        if not destination.exists():
            # Keep color management, but omit EXIF/GPS and other photo metadata.
            subprocess.run(['cwebp', '-quiet', '-q', quality, '-m', '6', '-metadata', 'icc',
                            '-resize', str(target), '0', str(source), '-o', str(destination)], check=True)
        variants.append({'src': f'/assets/img/optimized/{filename}', 'width': target})
    manifest[src] = {'width': width, 'height': height, 'variants': variants}
    original_bytes += source.stat().st_size
    optimized_bytes += (output / Path(variants[min(1, len(variants) - 1)]['src']).name).stat().st_size

(ROOT / 'src/data/image-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'{len(manifest)} images: originals {original_bytes:,} bytes; <=640px variants {optimized_bytes:,} bytes')
