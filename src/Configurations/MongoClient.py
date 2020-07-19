from pymongo import MongoClient
import urllib
import gridfs

client = MongoClient('mongodb+srv://srikanth:Pandu000.@bms.7fdx8.mongodb.net/<dbname>?retryWrites=true&w=majority')
bmsdb = client['BMS']
fs = gridfs.GridFS(bmsdb)

companyDB = "Company_Details"
customerDB = "Customer_Details"


