from src.Configurations.MongoClient import bmsdb, fs, customerDB
custcollec = bmsdb[customerDB]

def user_exists(custph):
    return True if custcollec.find({"_id":custph}, {}).count()==1 else False

def get_specified_customer_details(custph):
    return custcollec.find({"_id": custph})

