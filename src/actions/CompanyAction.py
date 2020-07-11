from src.Configurations.MongoClient import bmsdb, fs, companyDB
from flask import Blueprint, request
from src.utils.UsualUtil import send_response

company = Blueprint('company', __name__, url_prefix="/company")


@company.route('', methods=['GET'])
def getCompanyDetails():
    companycollec = bmsdb[companyDB]
    details = companycollec.find_one()
    details['logo'] = str(details['logo'])
    del details['_id']
    return send_response(True, data=details)


@company.route('', methods=['POST'])
def addCompanyDetails():
    try:
        companycollec = bmsdb[companyDB]
        if companycollec.count() >= 1:
            return send_response(False, msg="You already have a company dude"), 409
        companyname = request.form.get('companyname')
        if companyname == "":
            return send_response(False, msg="Don't you need a company name"), 422
        logo_id = None
        if 'companylogo' in request.files:
            logo = request.files.get('companylogo')
            logo_id = fs.put(logo)
            fs.put()
        description = request.form.get('description', "")
        data = {'companyname': companyname, 'logo': logo_id, 'description': description}
        companycollec.insert_one(data)
        return send_response(True, msg="Data entered"), 200
    except Exception as e:
        return {'status': 'failed due to some error, Try again if you are patient'}, 500


@company.route('', methods=['PUT'])
def updateCompanyDetails():
    return bmsdb.list_collection_names()[0]


@company.route('', methods=["DELETE"])
def deleteCompanyDetails():
    return bmsdb.list_collection_names()[0]
