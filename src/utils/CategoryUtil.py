from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable


def category_exists(category_name):
    return True if bmsdb[CategoryTable.collec_name].find(
        {CategoryTable.category_name: category_name}).count() > 0 else False


def valid_parent(category_name, parent_id):
    pipeline = [{"$addFields": {"id": {"$toString": "$_id"}}}, {"$graphLookup": {
        'from': 'Category',
        'startWith': "$id",
        'connectFromField': 'id',
        'connectToField': 'Parent',
        'as': 'Children',
        'restrictSearchWithMatch': {}
    }}, {'$match': {
        'Categoryname': category_name
    }}]
    child_ids = [str(child["_id"]) for child in list(bmsdb['Category'].aggregate(pipeline))[0]['Children']]
    return False if parent_id in child_ids else True
