from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable
from bson.objectid import ObjectId
from src.utils.UsualUtil import valid_object_id


def category_exists(category_name, parent_id):
    return True if bmsdb[CategoryTable.collec_name].find(
        {CategoryTable.category_name: category_name, CategoryTable.parent_id: parent_id}).count() > 0 else False


def valid_parent_id(parent_id):
    return True if valid_object_id(parent_id) and bmsdb[CategoryTable.collec_name].find(
        {"id": ObjectId(parent_id)}).count() == 1 else False


def valid_parent_for_category(category_name, parent_id):
    """
    Check if the parentId is not one the category children to prevent cycle
    """
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
    child_ids = [str(child["_id"]) for child in
                 list(bmsdb[CategoryTable.collec_name].aggregate(pipeline))[0]['Children']]
    return False if parent_id in child_ids else True
