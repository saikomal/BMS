from pymongo import MongoClient
import urllib
import gridfs

client = MongoClient('mongodb+srv://saikomal:' + urllib.parse.quote(
    "Saikomal@123") + '@bms.c7cqc.mongodb.net/<dbname>?retryWrites=true&w=majority')
bmsdb = client['BMS']
fs = gridfs.GridFS(bmsdb)

companyDB = "Company Details"
