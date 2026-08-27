HERO VIDEO
----------
worship-hero.mp4         Homepage hero background (used by index.html)
worship-hero-poster.jpg  Poster frame shown instantly while the video loads

The site is fully self-contained now — the hero plays this local file, no external CDN.

Optimized from the uploaded source for web:
  - Source:  churchhero video.mp4  (1920x1080, ~32 MB, 14.3 Mbps, with audio)
  - Output:  worship-hero.mp4       (1920x1080, ~7 MB, ~3 Mbps, silent, faststart)
  - Audio stripped (hero is muted); moov atom moved to front for instant streaming.

To replace the hero video later, drop a new file here named worship-hero.mp4
(and optionally refresh worship-hero-poster.jpg). Re-encode command used:

  ffmpeg -i "YOUR.mp4" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
         -preset slow -crf 23 -maxrate 5M -bufsize 10M -movflags +faststart \
         worship-hero.mp4
