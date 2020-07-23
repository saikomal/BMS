from flask import Blueprint, request
from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable
from src.utils.CategoryUtil import category_exists, valid_cat_id, valid_parent_for_category
from src.utils.UsualUtil import send_response
from src.utils.CompanyUtil import company_exists
import json
from bson import json_util, ObjectId

category = Blueprint('category', __name__, url_prefix="/category")
cat_collec = bmsdb[CategoryTable.collec_name]


@category.before_request
def check_if_company_exists():
    if not company_exists():
        return send_response(False, "Company not present to perform this operation"), 500


@category.route('', methods=['POST'])
def create_category():
    try:
        parent_cat_id = request.form.get("parent_category_id", "")
        if parent_cat_id != "" and not valid_cat_id(parent_cat_id):
            pass
        cat_name = request.form.get("category_name", "")
        if valid_cat_id(parent_cat_id):
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


@category.route('/<cat_id>', methods=['PUT'])
def update_category(cat_id):
    try:
        parent_cat_id = request.form.get("parent_category_id", "")
        if cat_id == parent_cat_id:
            return send_response(False, "parent id and cat id cannot be same")
        if parent_cat_id != "" and not valid_cat_id(parent_cat_id):
            pass
        cat_name = request.form.get("category_name", "")
        if not valid_cat_id(parent_cat_id):
            return send_response(False, "Invalid parent Id")
        if cat_name == "":
            return send_response(False, "Category name is needed"), 500
        if not valid_cat_id(cat_id):
            return send_response(False, "Category id is invalid or not available to update"), 500
        desc = request.form.get("description", "")
        newvalues = {CategoryTable.category_name: cat_name, CategoryTable.parent_id: parent_cat_id,
                     CategoryTable.desc: desc}
        cat_collec.update_one({"_id": ObjectId(cat_id)}, {'$set': newvalues})
        return send_response(True, "Category updated Successfully"), 200
    except Exception as e:
        return send_response(False, "Not interested in processing now"), 500

