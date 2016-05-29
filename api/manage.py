# -*- encoding: utf-8 -*-
import json
from flask import Flask, request, render_template, jsonify
from flask.ext.cors import CORS
from filter_esearch import search_podroes
from esearch import save, update, create_index
from elasticsearch import Elasticsearch

app = Flask(__name__)
CORS(app)
es = Elasticsearch()

@app.route("/")
def podroes():
	args = {
		"index": "matafome",
		"page": int(request.args.get('page', '1')),
		"lat": request.args.get('lat', None),
		"lon": request.args.get('lon', None)
	}

	res = search_podroes(args)
	return jsonify(res)

@app.route("/add/", methods=['GET', 'POST'])
def new_podrao():
	if request.method == "POST":
		return save(data=request.json)

@app.route("/like/", methods=['GET', 'POST'])
def likes():
	if request.method == "POST":
		return update(id=request.json["id"], field="likes")

@app.route("/complaint/", methods=['GET', 'POST'])
def complaint():
	if request.method == "POST":
		return update(id=request.json["id"], field="complaint")

def flaskrun(app, debug=True, port="5000"):
	if not es.indices.exists(index="matafome"):
		create_index(index="matafome")
	
	app.run(debug=debug, port=int(port))

if __name__ == '__main__':
	flaskrun(app)
