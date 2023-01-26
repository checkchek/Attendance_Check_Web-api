from deepface import DeepFace
result = DeepFace.verify(img1_path = "decodeImg.jpg", img2_path = "img3.jpg")
print(result)