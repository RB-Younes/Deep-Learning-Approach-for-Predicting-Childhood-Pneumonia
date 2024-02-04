import tensorflow as tf
import gradio as gr
import numpy as np
from scipy.signal import butter, filtfilt
from PIL import Image
import torchaudio.transforms as T
import torchaudio
import librosa
import os
import torch
import keras
import cv2
from flask import Flask, render_template, request
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array


def filter_fn(waveform):
    sample_rate = 8000
    #denoising 
    # Define the filter parameters
    lowcut = 50 # Hz
    highcut = 2500 # Hz
    order = 5 # 5th order Butterworth filter
    # Normalize the cut-off frequencies with respect to the Nyquist frequency
    nyquist_freq = 0.5 * sample_rate
    lowcut_normalized = lowcut / nyquist_freq
    highcut_normalized = highcut / nyquist_freq
    # Create the Butterworth filter coefficients using the `butter` function from SciPy
    b, a = butter(order, [lowcut_normalized, highcut_normalized], btype='band')
    # Transpose waveform from (batch_size, num_channels, samples) to (samples, num_channels)
    waveform = waveform.transpose(1, 0).contiguous()

    # Apply filter using filtfilt from scipy.signal
    waveform = waveform.numpy()
    waveform = filtfilt(b, a, waveform, axis=0)
    waveform = torch.from_numpy(waveform.copy())
    # Transpose back to original shape (num_channels, samples, batch_size)
    waveform = waveform.transpose(1, 0).contiguous()
    return waveform


model1 =  tf.keras.models.load_model('audio_model.h5')
class_names = ['Anomaly','Normal','Poor Quality']

def example(audio):

    # Load the audio file using a library such as librosa
    
    sample_rate,waveform  = audio
    print(sample_rate)
    
    waveform = torch.unsqueeze(torch.Tensor(waveform), 0)
    print(waveform)
    if sample_rate!=8000:
      print('WARNING SR!')
     
    n_fft = 400
    power = 2
    spectrogram = T.Spectrogram(
            n_fft=n_fft,
            win_length = None,
            hop_length = None,
            power=power
        )
    
    wavefrom_filtered = filter_fn(waveform)
    spec = torch.abs(spectrogram(wavefrom_filtered))
    spec = librosa.power_to_db(spec)
    spec = spec[0, :, :]

    # normalize the spectrogram values to the range [0, 255]
    spectrogram_norm = (spec - np.min(spec)) / (np.max(spec) - np.min(spec)) * 255
    spectrogram_norm = spectrogram_norm.astype(np.uint8)

    # create a PIL Image object from the spectrogram array
    img = Image.fromarray(spectrogram_norm)
    img.save(os.path.join('', 'spectogram.png'))
    #65044049_0.8_1_p4_252
    img = load_img('spectogram.png', target_size=(224, 224))

    # Convert the PIL object to a numpy array
    img_array = img_to_array(img)

    # Reshape the array to add an extra dimension to represent the batch size
    img_array = np.expand_dims(img_array, axis=0)

    # Preprocess the image by rescaling its pixel values to the range [0, 1]
    x = img_array / 255.

    prediction1 = model1.predict(x).flatten()
    print(prediction1)
    return {class_names[i]: float(prediction1[i]) for i in range(3)}

image = gr.inputs.Audio(source="upload") # initializing the input component
label = gr.outputs.Label(num_top_classes = 3) # initializing the output component
# launching the interface
gr.Interface(fn=example, inputs=image, outputs=label,
              examples=['Examples/3c-audio/Normal.wav','Examples/3c-audio/Anomaly.wav','Examples/3c-audio/Poor Quality.wav'],     
             theme=gr.themes.Soft(primary_hue = gr.themes.colors.purple)).launch(debug='True')

