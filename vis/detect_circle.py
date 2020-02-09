import cv2
import numpy as np
import time

import matplotlib.pyplot as plt

from skimage import data, color
from skimage.transform import hough_circle, hough_circle_peaks
from skimage.feature import canny
from skimage.draw import circle_perimeter
from skimage.util import img_as_ubyte

cap = cv2.VideoCapture('smol.mp4')

last = time.time()

while(True):
    ret, frame = cap.read()
    output = frame.copy()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = canny(gray, sigma=3, low_threshold=10, high_threshold=50)


    # Detect two radii
    hough_radii = np.arange(100, 110, 2)
    hough_res = hough_circle(edges, hough_radii)

    # Select the most prominent 3 circles
    accums, cx, cy, radii = hough_circle_peaks(hough_res, hough_radii,
                                               total_num_peaks=3)

    print(accums)
    # Draw them
    #image = color.gray2rgb(image)
    for center_y, center_x, radius in zip(cy, cx, radii):
        circy, circx = circle_perimeter(center_y, center_x, radius,
                                        shape=output.shape)
        output[circy, circx] = (220, 20, 20)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cv2.imshow('frame',output)
    time.sleep(max(0, 1/30 - (time.time() - last)))
    last = time.time()

cap.release()
cv2.destroyAllWindows()
