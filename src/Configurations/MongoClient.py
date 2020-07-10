from pymongo import MongoClient
import urllib
client = MongoClient('mongodb+srv://saikomal:'+urllib.parse.quote("Saikomal@123")+'@bms.c7cqc.mongodb.net/<dbname>?retryWrites=true&w=majority')
bmsdb = client['BMS']
