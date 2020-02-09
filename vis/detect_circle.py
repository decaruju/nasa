import cv2
import numpy as np
import time

import matplotlib.pyplot as plt

from skimage import data, color
from skimage.transform import hough_circle, hough_circle_peaks
from skimage.feature import canny
from skimage.draw import circle_perimeter
from skimage.util import img_as_ubyte
from skimage import data
from skimage.feature import corner_harris, corner_subpix, corner_peaks
from skimage.transform import warp, AffineTransform
from skimage.draw import ellipse


cap = cv2.VideoCapture('smoll.mp4')

last = time.time()

while(True):
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    canny = cv2.Canny(gray, 100, 200)

    output = frame.copy()

    corners = corner_harris(canny)
    coords = corner_peaks(corner_harris(canny), min_distance=10, threshold_rel=0.5)
    for coord in coords:
        cv2.circle(output, tuple([coord[1], coord[0]]), 10, (255, 0, 0), 1)
    cv2.polylines(output, [coords], False, (255, 0, 0))
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    cv2.imshow('frame',output)
    time.sleep(max(0, 1/30 - (time.time() - last)))
    last = time.time()

cap.release()
cv2.destroyAllWindows()
