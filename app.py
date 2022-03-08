from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
from xml.etree.ElementPath import prepare_descendant
from black import err
import numpy as np

# Keras
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image

# Flask utils
from flask import Flask, jsonify, redirect, send_from_directory, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
from flask_cors import CORS

# Define a flask app
app = Flask(__name__, static_folder='front-end/build', static_url_path='/')
# CORS(app)

# Model saved with Keras model.save()
MALARIA_MODEL_PATH = 'models/Malaria/malaria_pred_cnn.h5'

# Load your trained model
malaria_model = load_model(MALARIA_MODEL_PATH)
# model._make_predict_function()          # Necessary to make everything ready to run on the GPU ahead of time
print('Model loaded. Start serving...')


def predictDisease(img_path, model):
    image_to_predict = image.load_img(img_path, target_size=(130, 130, 3))
    image_to_predict = image.img_to_array(image_to_predict)
    image_to_predict = np.expand_dims(image_to_predict, axis=0)
    preds = model.predict(image_to_predict)
    return preds


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')


# @app.route('/')
# def index():
#     # Main page
#     return app.send_static_file('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Get disease type to diagnose
        disease_type = request.args.get("disease")
        print("DISEASE: "+disease_type)

        print("Received file from client...", f)
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        if (disease_type == '1'):
            print("Malaria")
            preds = predictDisease(file_path, malaria_model)
        elif (disease_type == '2'):
            print("Pneumonia")
        elif (disease_type == '3'):
            print("Covid19")

        # Remove file from server after predictions
        os.remove(file_path)

        try:
            labels = np.array(preds)
        except UnboundLocalError as error:
            print(error)
            return jsonify({'results': "Error!"})

        labels[labels >= 0.9] = 1
        labels[labels <= 0.02] = 0

        print(labels)
        final = np.array(labels)

        # pred_result = ""

        if final[0][0] == 0:
            pred_result = "Infected"
        elif final[0][0] == 1:
            pred_result = "Normal"
        # else:
        #   pred_result = "Invalid image"

        response = jsonify({'results': pred_result})
    return response

    #    if final[0][0]==1:
    #       return "Pneumonia"
    #    else:
    #        return "Normal"
    # return None

    # this section is used by gunicorn to serve the app on Heroku
if __name__ == '__main__':
    app.run()
    # uncomment this section to serve the app locally with gevent at:  http://localhost:5000
    # Serve the app with gevent
    # http_server = WSGIServer(('', 5000), app)
    # http_server.serve_forever()
