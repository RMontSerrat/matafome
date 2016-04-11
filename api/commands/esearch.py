# -*- encoding: utf-8 -*-
import json
import os, base64, re, logging
from elasticsearch import Elasticsearch

# Log transport details (optional):
logging.basicConfig(level=logging.INFO)

# Parse the auth and host from env:
bonsai = 'https://fwj5op1w:hf0hvbrp1is5pzvl@smoke-7769838.us-east-1.bonsai.io'
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

mapping = {    
	"settings": {
	"number_of_shards": 1,
 	"number_of_replicas": 0
	},
  "mappings": {
     "podrao": {
        "properties": {
           "complaints": {
              "type": "long"
           },
           "likes": {
              "type": "long"
           },
           "location": {
            	"type" : "geo_point"
           },
           "name": {
              "type": "string"
           },
           "opening_hours": {
              "type": "string"
           },
           "types": {
              "type": "string"
           },
           "vicinity": {
              "type": "string"
           }
        }
     }
  }
}

def index_elasticsearch(data):
   body = json.dumps(data)
   es.index(index="matafome", doc_type="podrao", body=body)

def create_mapping(index):
  	es.indices.create(index=index, body=mapping)

def update_likes(id):
	query = {"fields": ["likes"], "query": {"match": {"_id": id}}}
	result = es.search(index="matafome", doc_type="podrao", body=query)
	
	likes = int(result["hits"]["hits"][0]["fields"]["likes"][0])
	body = {"doc": {"likes": likes+1}}

	es.update(index="matafome", doc_type="podrao", id=id, body=body)

def update_complaints(id):
	query = {"fields": ["complaints"], "query": {"match": {"_id": id}}}
	result = es.search(index="matafome", doc_type="podrao", body=query)
	
	complaints = int(result["hits"]["hits"][0]["fields"]["complaints"][0])
	body = {"doc": {"complaints": complaints+1}}

	es.update(index="matafome", doc_type="podrao", id=id, body=body)