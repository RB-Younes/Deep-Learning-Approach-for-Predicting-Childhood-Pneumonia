import tensorflow as tf
import gradio as gr
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageFont, ImageDraw 
import keras
import PIL
import cv2
from tensorflow.keras.preprocessing.image import load_img,save_img
from tensorflow.keras.preprocessing.image import img_to_array


model1 =  tf.keras.models.load_model('best_model.h5')
class_names = ['Normal Lungs','Pneumonia']

def superimpose_gradcam(img,heatmap, alpha=0.7):
    '''
    Superimpose Grad-CAM Heatmap on image
    '''
    heatmap = (heatmap - np.min(heatmap)) / (np.max(heatmap) - np.min(heatmap))
    heatmap = np.uint8(255 * heatmap) # Back scaling to 0-255 from 0 - 1
    jet = plt.get_cmap("jet") # Colorizing heatmap
    jet_colors = jet(np.arange(256))[:, :3] # Using RGB values
    jet_heatmap = jet_colors[heatmap]
    jet_heatmap = keras.utils.array_to_img(jet_heatmap)
    jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
    jet_heatmap = keras.utils.img_to_array(jet_heatmap)/255
    
    superimposed_img = jet_heatmap * alpha + img # Superimposing the heatmap on original image
    superimposed_img = keras.utils.array_to_img(superimposed_img)
    return superimposed_img

def claheImage(img): #Nada
    # convert image to LAB color space
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    gray = cv2.convertScaleAbs(gray)
    # apply CLAHE to the L channel
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    cl = clahe.apply(gray)

    # convert the LAB image back to RGB color space
    final = cv2.cvtColor(cl, cv2.COLOR_GRAY2BGR)
    cl_img = np.float64(final)
    return cl_img

def add_margin(pil_img, top, right, bottom, left, color):
    width, height = pil_img.size
    new_width = width + right + left
    new_height = height + top + bottom
    result = Image.new(pil_img.mode, (new_width, new_height), color)
    result.paste(pil_img, (left, top))
    return result

def add_info(im_new,txt_nom,txt_prenom,sexe,Age,poids,other,pred):
    width, height = im_new.size
    font_type = ImageFont.truetype("arial.ttf", 100)
    title_text = str(pred)
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((width/2- 300,100), title_text, (237, 230, 211), font=font_type)
    #add infos
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "First Name: "+str(txt_nom)
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -280), title_text, (237, 230, 211), font=font_type)
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "Second Name: "+str(txt_prenom)
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -240), title_text, (237, 230, 211), font=font_type)
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "Sex: "+str(sexe)
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -200), title_text, (237, 230, 211), font=font_type)
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "Age: "+str(Age) +" years"
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -160), title_text, (237, 230, 211), font=font_type)
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "Weight: "+str(poids) +" Kg"
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -120), title_text, (237, 230, 211), font=font_type)
    font_type = ImageFont.truetype("arial.ttf", 35)
    title_text = "Other: "+other_cut(str(other) )+""
    image_editable = ImageDraw.Draw(im_new)
    image_editable.text((100,height -80), title_text, (237, 230, 211), font=font_type)
    return im_new

def other_cut(other):
    nbr_cut = len(other)/110
    nbr = 0
    new_other = ''
    if nbr_cut >= 1 : 
        for char in other :
            nbr = nbr + 1 
            if nbr % 110 == 0 :
                new_other = new_other + '\n'
            new_other = new_other + char
    else :
        new_other = other
    
    return  new_other


def contour(path):
    # Load the color image
    img = cv2.imread(path)

    # Convert the image to the HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Define the lower and upper bounds for the red color in HSV color space
    lower_red = np.array([0, 50, 50])
    upper_red = np.array([11, 255, 255])

    # Threshold the image to obtain a binary mask that highlights the red areas
    mask1 = cv2.inRange(hsv, lower_red, upper_red)

    # Combine the masks to obtain a final binary mask that highlights the red areas
    mask = mask1

    # Find the contours in the binary mask
    contours , _  = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
 
    # Draw a bounding box around each contour with a red color
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
    img_file = "cam2c-contour.png"
    cv2.imwrite(img_file, img)
    

def example(txt_nom,txt_prenom,sexe,Age,poids,image,other):
 # convert ndarray to image file
    img_file = "temp2c.png"
    save_img(img_file, image)

    img_ori = load_img("temp2c.png", target_size=(224, 224))
    # Convert the PIL object to a numpy array
    img_array =claheImage( img_to_array(img_ori))

    # Reshape the array to add an extra dimension to represent the batch size
    img_array = np.expand_dims(img_array, axis=0)

    # Preprocess the image by rescaling its pixel values to the range [0, 1]
    x = img_array / 255.

    prediction1 = model1.predict(x).flatten()
    predicted_class = np.argmax(prediction1)
    # CAM
    layer = model1.get_layer('mobilenet_1.00_224')
    new_model = tf.keras.models.Model(inputs=layer.input, outputs=[layer.get_layer('conv_pw_13').output])
    # Get the final convolutional feature maps for the input image
    conv_outputs = new_model.predict(x)

    class_weights = model1.layers[-1].get_weights()[0][:,predicted_class]

    arr = np.ones((512,))
    class_weights = np.concatenate((arr,class_weights ))
    # Compute the class activation map
    cam1 = np.dot(conv_outputs, class_weights)
    res =cam1[0, :, :]

    result = superimpose_gradcam( img_to_array(img_ori)/255, res)
    img_file = "cam2c.png"
    save_img(img_file, result)
    contour(img_file)


    img_file = "res2c.png"
    im = Image.open("temp2c.png")
    im_new = add_margin(im,300 , 100, 300, 100, (0, 0, 0))
    im_new = add_info(im_new,txt_nom,txt_prenom,sexe,Age,poids,other,class_names[np.argmax(prediction1)])
    im_new.save(img_file, quality=100)
    return {class_names[i]: float(prediction1[i]) for i in range(2)},"cam2c-contour.png","res2c.png"

image = gr.inputs.Image(label="Chest X-ray") # initializing the input component
txt_nom = gr.Textbox(label="First Name")
txt_prenom = gr.Textbox(label="Second Name")
sexe = gr.Radio(["Male", "Female", "Other"],label="Sex")
Age = gr.Slider(0, 12, value=0, step = 0.1,label="Age")
poids = gr.Slider(0, 40, value=0, step = 0.1,label="weight (kg)")
other = gr.Textbox(label="Other", lines=2)
label = [gr.outputs.Label(num_top_classes=2,label="Prediction"), gr.outputs.Image(type="filepath",label="CAM"), gr.outputs.Image(type="filepath",label="result")] # initializing the output component
# launching the interface
gr.Interface(fn=example, inputs=[txt_nom,txt_prenom,sexe,Age,poids,image,other], 
             outputs=label,
             examples=[['-','-','Other',0,0,'Examples/2c-xray/Normal.jpeg','-'],['-','-','Other',0,0,'Examples/2c-xray/Pneumonia.jpeg','-']],
             theme=gr.themes.Soft(primary_hue = gr.themes.colors.purple)).launch(debug='True')

