from randimage import get_random_image, show_array
import matplotlib

img_size = (128,128)

img = get_random_image(img_size)

matplotlib.image.imsave("/images/randimage.png", img)