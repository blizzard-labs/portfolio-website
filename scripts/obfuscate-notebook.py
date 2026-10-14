"""Renames numbered notebook images (001.webp, ...) to random names and writes
the manifest the viewer reads, so page URLs can't be guessed in sequence.

Usage: python3 scripts/obfuscate-notebook.py public/assets/notebook
"""
import json
import os
import secrets
import sys

out = sys.argv[1]
numbered = sorted(f for f in os.listdir(os.path.join(out, "pages")) if f[:3].isdigit())

pages = []
for name in numbered:
    entry = {}
    for kind in ("pages", "thumbs"):
        new = f"{secrets.token_hex(12)}.webp"
        os.rename(os.path.join(out, kind, name), os.path.join(out, kind, new))
        entry["src" if kind == "pages" else "thumb"] = f"{kind}/{new}"
    pages.append(entry)

with open(os.path.join(out, "manifest.json"), "w") as f:
    json.dump({"pages": pages}, f)

print(f"Obfuscated {len(pages)} pages")
