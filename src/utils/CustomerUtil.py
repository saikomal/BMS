from src.Configurations.MongoClient import bmsdb, fs, customerDB
custcollec = bmsdb[customerDB]
def checkph(custph):
    details = list(custcollec.find({"_id":custph}, {'_id': False}))
    if(len(details)==0):
        return True
    else:
        return False

