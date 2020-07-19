from pymongo import MongoClient
import urllib
import gridfs

# client = MongoClient('mongodb+srv://saikomal:' + urllib.parse.quote(
#     "Saikomal@123") + '@bms.c7cqc.mongodb.net/<dbname>?retryWrites=true&w=majority')
client = MongoClient('localhost', 27017)
dblist = client.list_database_names()
bmsdb = client['BMS']
fs = gridfs.GridFS(bmsdb)