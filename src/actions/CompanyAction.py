from src.Configurations.MongoClient import bmsdb
from flask import Blueprint
company = Blueprint('company', __name__, url_prefix="/company")

@company.route('/')
def index():
    return bmsdb.list_collection_names()[0]
