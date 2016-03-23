# -*- encoding: utf-8 -*-
import json
from flask import Flask, request, render_template, jsonify
from flask.ext.cors import CORS
from filter_esearch import search_podroes
from commands.esearch import index_elasticsearch, update_likes, update_complaints
app = Flask(__name__)
CORS(app)

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
		index_elasticsearch(data=request.json)
	return "Podrão adicionado com sucesso :)"

@app.route("/like/", methods=['GET', 'POST'])
def likes():
	if request.method == "POST":
		update_likes(id=request.json["id"])
		return ""

@app.route("/complaint/", methods=['GET', 'POST'])
def complaint():
	if request.method == "POST":
		update_complaints(id=request.json["id"])
		return ""

if __name__ == '__main__':
	app.run(debug=True, use_reloader=True, threaded=True)

