import sys
import random

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Нужно установить Pillow: pip install Pillow")
    sys.exit(1)

def generate_icon(size, filename):
    color = (random.randint(50, 200), random.randint(50, 200), random.randint(50, 200))
    img = Image.new('RGB', (size, size), color=color)
    d = ImageDraw.Draw(img)

    center = size // 2
    radius = size // 3
    d.ellipse((center - radius, center - radius, center + radius, center + radius), fill=(255, 255, 255))

    img.save(f"public/{filename}")
    print(f"Icon generated: public/{filename}")

# Генерируем
generate_icon(192, 'pwa-192x192.png')
generate_icon(512, 'pwa-512x512.png')
