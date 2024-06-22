import json
from scipy.io.wavfile import write
from flask_cors import CORS,cross_origin
from flask import Flask, request, jsonify, send_file,make_response,render_template
import google.generativeai as genai
import textwrap
import numpy as np
import pandas as pd
import pickle
import google.ai.generativelanguage as glm

app = Flask(__name__)
CORS(app)
@app.route('/',methods=['GET','POST'])
@cross_origin()
def generate_audio():
    data = request.get_json()
    data=json.loads(data)
    text=data['txt']
    

    return text




if __name__ == '__main__':
    app.run(debug=True)