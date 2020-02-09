import cv2
import numpy as np
import os


FILE_OUTPUT = 'output.avi'

if os.path.isfile(FILE_OUTPUT):
    os.remove(FILE_OUTPUT)

cap = cv2.VideoCapture(0)

currentFrame = 0

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

out = cv2.VideoWriter('output.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 30, (frame_width,frame_height))

def nothing(x):
    # any operation
    pass

cap = cv2.VideoCapture('VID_20200209_015217.mp4')

cv2.namedWindow("Trackbars")
cv2.createTrackbar("L-H", "Trackbars", 164, 180, nothing)
cv2.createTrackbar("L-S", "Trackbars", 112, 255, nothing)
cv2.createTrackbar("L-V", "Trackbars", 22, 255, nothing)
cv2.createTrackbar("U-H", "Trackbars", 180, 180, nothing)
cv2.createTrackbar("U-S", "Trackbars", 255, 255, nothing)
cv2.createTrackbar("U-V", "Trackbars", 243, 255, nothing)

font = cv2.FONT_HERSHEY_COMPLEX

i = 0
while True:
    ret, frame = cap.read()

    if ret == False:
        break

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    l_h = cv2.getTrackbarPos("L-H", "Trackbars")
    l_s = cv2.getTrackbarPos("L-S", "Trackbars")
    l_v = cv2.getTrackbarPos("L-V", "Trackbars")
    u_h = cv2.getTrackbarPos("U-H", "Trackbars")
    u_s = cv2.getTrackbarPos("U-S", "Trackbars")
    u_v = cv2.getTrackbarPos("U-V", "Trackbars")

    lower_red = np.array([l_h, l_s, l_v])
    upper_red = np.array([u_h, u_s, u_v])

    mask = cv2.inRange(hsv, lower_red, upper_red)
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.erode(mask, kernel)

    # Contours detection
    if int(cv2.__version__[0]) > 3:
        # Opencv 4.x.x
        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    else:
        # Opencv 3.x.x
        _, contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    for cnt in contours:
        area = cv2.contourArea(cnt)
        approx = cv2.approxPolyDP(cnt, 0.02*cv2.arcLength(cnt, True), True)
        x = approx.ravel()[0]
        y = approx.ravel()[1]

        if area > 400:
            cv2.drawContours(frame, [approx], 0, (0, 0, 0), 5)

            if len(approx) == 3:
                cv2.putText(frame, "Triangle", (x, y), font, 1, (0, 0, 0))
            elif len(approx) == 4:
                cv2.putText(frame, "Rectangle", (x, y), font, 1, (0, 0, 0))
            elif 10 < len(approx) < 20:
                cv2.putText(frame, "Circle", (x, y), font, 1, (0, 0, 0))



    out.write(frame)
    cv2.imwrite(f"{i}.jpg", frame)
    i += 1
    cv2.imshow("Frame", frame)
    cv2.imshow("Mask", mask)

    key = cv2.waitKey(1)
    if key == 27:
        break

out.release()
cap.release()
cv2.destroyAllWindows()


