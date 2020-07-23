from flask import Blueprint, request
from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable
from src.utils.CategoryUtil import category_exists, valid_cat_id, valid_parent_for_category, get_all_children
from src.utils.UsualUtil import send_response
from src.utils.CompanyUtil import company_exists
from bson import ObjectId

purchase = Blueprint('category', __name__, url_prefix="/purchase")
pur_collec = bmsdb[purchase]