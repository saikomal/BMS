from flask import Blueprint, request
from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable
from src.utils.CategoryUtil import category_exists, valid_parent_id, valid_parent_for_category
from src.utils.UsualUtil import send_response
from src.utils.CompanyUtil import company_exists
import json
from bson import ObjectId
from bson import json_util

category = Blueprint('category', __name__, url_prefix="/category")
cat_collec = bmsdb[CategoryTable.collec_name]

# Custom encoder to change the ObjectId returned from mongo Query
# class JSONEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, ObjectId):
#             return str(o)
#         return json.JSONEncoder.default(self, o)


@category.before_request
def check_if_company_exists():
    if not company_exists():
        return send_response(False, "Company not present to perform this operation"), 500


@category.route('', methods=['POST'])
def create_category():
    try:
        parent_cat_id = request.form.get("parent_category_id", "")
        if parent_cat_id != "" and not valid_parent_id(parent_cat_id):
            pass
        cat_name = request.form.get("category_name", "")
        return send_response(False, "Invalid parent Id")
        if cat_name == "":
            return send_response(False, "Category name is needed"), 500
        desc = request.form.get("description", "")
        if category_exists(cat_name, parent_cat_id):
            return send_response(False, "Category already exists")
        a = cat_collec.insert_one(
            {CategoryTable.category_name: cat_name, CategoryTable.parent_id: parent_cat_id, CategoryTable.desc: desc})
        return send_response(True, "Category added Successfully", str(a.inserted_id)), 200
    except Exception as e:
        print(e)
        return send_response(False, "Not interested in processing now"), 500


@category.route('/', methods=["GET"])
def get_categories():
    try:
        docs = list(cat_collec.find())
        for doc in docs:
            doc["_id"] = str(doc["_id"])
        return send_response(True, "Category retrived Successfully", docs), 200
    except Exception as e:
        return send_response(False, "Not interested in processing now"), 500


@category.route('/nested', methods=["GET"])
def get_nested_categories():
    try:
        pipeline = [{"$addFields": {"id": {"$toString": "$_id"}}}, {"$graphLookup": {
            'from': 'Category',
            'startWith': "$id",
            'connectFromField': 'id',
            'connectToField': 'Parent',
            'as': 'Children',
            'restrictSearchWithMatch': {}
        }}]
        return send_response(True, "Category retrieved Successfully",
                             json.dumps(list(bmsdb[CategoryTable.collec_name].aggregate(pipeline)),
                                        default=json_util.default)), 200
    except Exception as e:
        return send_response(False, "Not interested in processing now"), 500
