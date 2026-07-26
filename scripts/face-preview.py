"""Контрольный лист: рамки лиц из face-boxes.py, нарисованные на фото.

Зелёный прямоугольник — что нашёл Haar; синяя линия — расчётный верх причёски,
красная — расчётный подбородок (по коэффициентам ниже). Служит для калибровки.
Запуск: uv run --with "opencv-python-headless<5" --with numpy python scripts/face-preview.py
"""
import pathlib

import cv2
import numpy as np

SRC = pathlib.Path(r"C:\Users\vlad\Documents\nashedelo23\Фото спикеров")
OUT = pathlib.Path(r"C:\Users\vlad\Documents\nashedelo23\shots-mobile\faces-preview.jpg")

# из face-boxes.py
BOXES = {
    "Нагорная.jpg": (395, 503, 324),
    "Шаповалова Л.В..jpg": (282, 202, 324),
    "Жабин В.В..jpg": (308, 463, 555),
    "Гаврилов.jpg": (461, 506, 215),
    "Папета.jpg": (319, 177, 133),
    "Гертель.jpg": (577, 272, 280),
    "Амельченко.jpg": (225, 87, 197),
    "Беляева.jpg": (432, 156, 287),
}
HAIR_K = 0.55   # верх причёски выше рамки на HAIR_K * размер рамки
CHIN_K = 1.00   # подбородок = верх рамки + CHIN_K * размер рамки

CELL_W, CELL_H = 380, 480
cells = []

for name, (fx, fy, fs) in BOXES.items():
    img = cv2.imdecode(np.fromfile(str(SRC / name), dtype="uint8"), cv2.IMREAD_COLOR)
    hair = int(fy - HAIR_K * fs)
    chin = int(fy + CHIN_K * fs)
    cv2.rectangle(img, (fx, fy), (fx + fs, fy + fs), (0, 220, 0), max(2, img.shape[1] // 300))
    cv2.line(img, (0, hair), (img.shape[1], hair), (255, 120, 0), max(2, img.shape[1] // 300))
    cv2.line(img, (0, chin), (img.shape[1], chin), (0, 0, 255), max(2, img.shape[1] // 300))
    cv2.line(img, (fx + fs // 2, 0), (fx + fs // 2, img.shape[0]), (0, 255, 255), max(2, img.shape[1] // 340))

    scale = min(CELL_W / img.shape[1], CELL_H / img.shape[0])
    small = cv2.resize(img, (int(img.shape[1] * scale), int(img.shape[0] * scale)))
    canvas = np.full((CELL_H, CELL_W, 3), 240, dtype="uint8")
    oy, ox = (CELL_H - small.shape[0]) // 2, (CELL_W - small.shape[1]) // 2
    canvas[oy:oy + small.shape[0], ox:ox + small.shape[1]] = small
    cv2.putText(canvas, name.split(".")[0], (6, CELL_H - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (20, 20, 20), 1)
    cells.append(canvas)

rows = [np.hstack(cells[i:i + 4]) for i in range(0, len(cells), 4)]
cv2.imwrite(str(OUT), np.vstack(rows), [cv2.IMWRITE_JPEG_QUALITY, 88])
print("OK:", OUT)
