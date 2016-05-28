# -*- encoding: utf-8 -*-
import json
import os, base64, re, logging
from elasticsearch import Elasticsearch

es = Elasticsearch()

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


def get_obj(data):
   obj = {
      'name': data['name'],
      'vicinity': data['vicinity'],
      'crd': data['crd']
   }

   return json.dumps(obj)

def save(data):
   if 'street_address' in data['types'] or 'route' in data['types']:
      body = get_obj(data)
      index_elasticsearch(body)

def index_elasticsearch(body):
   es.index(index="matafome", doc_type="podrao", body=body)

def create_mapping(index):
  	es.indices.create(index=index, body=mapping)

def update(id, field):
	query = {"fields": [field], "query": {"match": {"_id": id}}}
	result = es.search(index="matafome", doc_type="podrao", body=query)

	likes = int(result["hits"]["hits"][0]["fields"][field][0])
	body = {"doc": {field: likes+1}}

	es.update(index="matafome", doc_type="podrao", id=id, body=body)