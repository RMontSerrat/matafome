# -*- encoding: utf-8 -*-
import json
import os, base64, re, logging
from elasticsearch import Elasticsearch

# Log transport details (optional):
logging.basicConfig(level=logging.INFO)

# Parse the auth and host from env:
bonsai = os.environ['https://fwj5op1w:hf0hvbrp1is5pzvl@smoke-7769838.us-east-1.bonsai.io']
auth = re.search('https\:\/\/(.*)\@', bonsai).group(1).split(':')
host = bonsai.replace('https://%s:%s@' % (auth[0], auth[1]), '')

# Connect to cluster over SSL using auth for best security:
es_header = [{
  'host': host,
  'port': 443,
  'use_ssl': True,
  'http_auth': (auth[0],auth[1])
}]

# Instantiate the new Elasticsearch connection:
es = Elasticsearch(es_header)

# Verify that Python can talk to Bonsai (optional):
es.ping()

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
	filter = {"geo_distance": {"distance": "10km", "location": {"lat":  float(lat), "lon": float(lon)}}}

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