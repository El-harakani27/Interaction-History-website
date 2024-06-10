# server.py - main app entrypoint
# @author jlacson

from flask import Flask, make_response, render_template
from playsound import playsound
from os import listdir

# define our variables
# TODO: pull from env vars if we dockerize
DEBUG = True
PORT  = 9999
# you'd expect this to be consistent
TEMPLATE_DIR = "./templates"
SOUND_DIR = "./audio"

# define our flask app
flask_app = Flask(__name__, template_folder=TEMPLATE_DIR)

# define endpoints here
@flask_app.route('/')
def home():
    """
    Main entrypoint for the app.
    Serves the home template.
    """
    return render_template("test.html")
# run our flask app here
@flask_app.route('/play')
def listPlay():
    """
    Shows a list of files we can play.
    """
    # make the list
    files = [{'name': i, 'id': i.split('-')[0]} for i in listdir(SOUND_DIR)]
    print(files)
    return render_template("list_files.html", files=files)
@flask_app.route('/play/<id>')
def play(id):
    """
    Plays the requisite sound file with the right ID.
    If the ID is invalid, plays nothing.
    """
    print(listdir('.'))
    # get directory contents
    contents = listdir(SOUND_DIR)
    ids = [i.split('-')[0] for i in contents]
    # check ID
    if id not in ids:
        return make_response("Could not find sound " + id)
    else:
        playsound(SOUND_DIR + '/' + contents[ids.index(id)])
        return make_response("Success!")

@flask_app.route('/status')
def heartbeat():
    """
    A heartbeat in case we containerize.
    Might not use this.
    """
    return make_response("0")
if __name__ == "__main__":
    # bind to all interfaces, 
    # use debug and port vars set earlier
    flask_app.run(host='0.0.0.0', debug=DEBUG, port=PORT)