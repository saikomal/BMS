from src.Configurations.MongoClient import bmsdb, fs
from src.Configurations.CustomerTable import CustomerTable
custcollec = bmsdb[CustomerTable.collecname]

def user_exists(custph):
    return True if custcollec.find({"_id":custph}, {}).count()==1 else False

def get_specified_customer_details(custph):
    return custcollec.find({"_id": custph})

