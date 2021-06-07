import os
import flask
from flask import Flask
from flask import request
from flask_cors import CORS
import json
from main import *
import ast

# Create the application.
app = Flask(__name__, static_folder='frontend/build',
            template_folder='frontend/build', static_url_path="")
CORS(app)


# Route for the main page
@app.route('/', methods=['GET'])
def index():
    return flask.render_template("index.html")


@app.route('/getGoodBadProbability', methods=['GET'])
def get_proba():
    hero_data = request.args.get("HeroData", default=None, type=str)
    result = {'result': (get_hero_proba(hero_data))}
    print(result)
    print(type(result))
    return flask.jsonify(result)


@app.route('/testEndpoint', methods=['GET'])
def test():
    result = {'result': True}
    return flask.jsonify(result)


if __name__ == '__main__':
    app.run(debug=False, port=5000)
