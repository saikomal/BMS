from src.Configurations.MongoClient import bmsdb, fs, companyDB
from flask import Blueprint, request
from src.utils.UsualUtil import send_response

company = Blueprint('company', __name__, url_prefix="/company")

companycollec = bmsdb[companyDB]


@company.route('', methods=['GET'])
def getCompanyDetails():
    details = companycollec.find_one()
    details['logo'] = str(details['logo'])
    del details['_id']
    return send_response(True, data=details)


@company.route('', methods=['POST'])
def addCompanyDetails():
    try:
        if companycollec.count() >= 1:
            return send_response(False, msg="You already have a company dude"), 409
        companyname = request.form.get('companyname')
        if companyname == "":
            return send_response(False, msg="Don't you need a company name"), 422
        logo_id = None
        if 'companylogo' in request.files:
            logo = request.files.get('companylogo')
            logo_id = fs.put(logo)
        description = request.form.get('description', "")
        data = {'companyname': companyname, 'logo': logo_id, 'description': description}
        companycollec.insert_one(data)
        return send_response(True, msg="Data entered"), 200
    except Exception as e:
        return send_response(False,msg="failed due to some error, Try again if you are patient"), 500


@company.route('', methods=['PUT'])
def updateCompanyDetails():
    try:
        details = companycollec.find_one()
        data = request.form.to_dict()
        if 'companylogo' in request.files:
            logo = request.files.get('companylogo')
            fs.delete(details['logo'])
            logo_id = fs.put(logo)
            data['logo'] = logo_id
        newvalues = {"$set": data}
        companycollec.update_one(details, newvalues)
        return send_response(True, msg="Data updated"), 200
    except Exception as e:
        return send_response(False,msg="failed due to some error, Try again if you are patient"), 500


@company.route('', methods=["DELETE"])
def deleteCompanyDetails():
    return bmsdb.list_collection_names()[0]
