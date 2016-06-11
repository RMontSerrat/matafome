# -*- encoding: utf-8 -*-
import json
from elasticsearch import Elasticsearch

es = Elasticsearch()

per_page = 10
query = {
	"query": {
		"filtered": {
			"query": {
				"match_all": {}
			},
			"filter": {}
		}
	},
	"sort": [
     	{
	      	"_geo_distance": {
		        "location": [],
		        "order":         "asc",
		        "unit":          "km",
		        "distance_type": "plane"
      		}
    	}
  	],
	"size": per_page,
	"from": 0
}

def pop_filter():
	query["query"]["filtered"]["filter"] = {}


def filter_sort(lat, lon):
	location = [float(lat), float(lon)]
	query["sort"][0]["_geo_distance"]["location"].append(location)

def filter_distance(lat, lon):
	filter = {"geo_distance": {"distance": "3km", "location": {"lat":  float(lat), "lon": float(lon)}}}

	query["query"]["filtered"]["filter"] = filter


def search_podroes(args):
	pop_filter()

  	if args["lat"] and args["lon"]:
  		filter_distance(args["lat"], args["lon"])
		filter_sort(args["lat"], args["lon"])

	query["size"] = per_page
	if args["page"] > 1:
		query["from"] = (args["page"] - 1) * per_page
	else:
		query["from"] = 0

	res = es.search(index=args["index"],
				  body=query)

	count = res["hits"]["total"]
	previous_page = args["page"] > 1 and (args["page"] - 1) or None
	if count > (args["page"] * per_page):
		next_page = args["page"] + 1
	else:
		next_page = None

	podroes_collection = {
		'podroes': res["hits"]["hits"],
		'nextPage': next_page,
		'previousPage': previous_page,
		'total': count
	}
	return podroes_collection