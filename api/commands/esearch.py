# -*- encoding: utf-8 -*-
import json
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