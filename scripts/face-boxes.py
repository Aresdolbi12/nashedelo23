"""Объективные координаты лиц на исходных фото спикеров.

Haar-каскад OpenCV даёт рамку лица (лоб→подбородок, без волос) — по ней
считаются кадры для карточек и попапа программы, чтобы не мерить на глаз.
Запуск: uv run --with "opencv-python-headless<5" --with numpy python scripts/face-boxes.py
"""
import json
import pathlib

import cv2
import numpy as np

SRC = pathlib.Path(r"C:\Users\vlad\Documents\nashedelo23\Фото спикеров")
FILES = {
    "Елена Алексеевна Пистунова.png": "pistunova",
    "Инна Леонидовна Беляева.png": "belyaeva",
    "Нагорная.jpg": "nagornaya",
    "Шаповалова Л.В..jpg": "shapovalova",
    "Жабин.jpeg": "zhabin",
    "Гаврилов.jpg": "gavrilov",
    "Татьяна Николаевна Папета.png": "papeta",
    "Гертель Е.А..jpg": "gertel",
    "Амельченко.jpg": "amelchenko",
}

cascades = [
    cv2.CascadeClassifier(cv2.data.haarcascades + n)
    for n in ("haarcascade_frontalface_alt2.xml", "haarcascade_frontalface_default.xml")
]
out = {}

for name, slug in FILES.items():
    # кириллица в пути: cv2.imread её не берёт, читаем через numpy
    buf = np.fromfile(str(SRC / name), dtype="uint8")
    img = cv2.imdecode(buf, cv2.IMREAD_COLOR)
    gray = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))
    h, w = gray.shape

    faces = []
    for c in cascades:
        faces = c.detectMultiScale(gray, scaleFactor=1.03, minNeighbors=5,
                                   minSize=(int(w * 0.05), int(w * 0.05)))
        if len(faces):
            break
    if not len(faces):
        out[slug] = {"imgW": int(w), "imgH": int(h), "error": "no face"}
        continue

    fx, fy, fw, fh = max(faces, key=lambda f: f[2] * f[3])
    out[slug] = {
        "imgW": int(w), "imgH": int(h),
        "x": int(fx), "y": int(fy), "w": int(fw), "h": int(fh),
        "cx": int(fx + fw / 2), "found": int(len(faces)),
    }

print(json.dumps(out, ensure_ascii=False))
