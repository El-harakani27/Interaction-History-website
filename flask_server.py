import json
from scipy.io.wavfile import write
from flask_cors import CORS,cross_origin
from flask import Flask, request, jsonify, send_file
app = Flask(__name__)
CORS(app)

from transformers import AutoProcessor, SeamlessM4Tv2Model
import numpy as np
import torch
# Load model and processor
processor = AutoProcessor.from_pretrained("facebook/seamless-m4t-v2-large")
model_1 = SeamlessM4Tv2Model.from_pretrained("facebook/seamless-m4t-v2-large")
@app.route('/flask', methods=['POST','GET'])
@cross_origin()
def generate_audio():

    data = request.get_json()
    data=json.loads(data)
    text=data['txt']
    print(text)

    text_inputs = processor(text=text, src_lang="eng", return_tensors="pt").to('cuda')
    audio_array_from_text = model_1.generate(**text_inputs, tgt_lang="eng")[0]
    audio_np = audio_array_from_text.cpu().numpy().squeeze()

    print(audio_np.tolist())
    sample_rate = model_1.config.sampling_rate

    output_filename = './output_audio.wav'

    # Save the audio data to a file
    
    sample_rate = model_1.config.sampling_rate
    write(output_filename, sample_rate, audio_np.astype(np.float32))

    return send_file('./output_audio.wav',mimetype='audio/wav')

if __name__ == '__main__':
    app.run(debug=True)