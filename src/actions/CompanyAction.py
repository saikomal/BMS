from src.Configurations.MongoClient import bmsdb, fs
from flask import Blueprint, request
from src.utils.UsualUtil import send_response
from src.Configurations.Companytable import CompanyTable
from src.utils.AuditUtil import audit

company = Blueprint('company', __name__, url_prefix="/company")

companycollec = bmsdb[CompanyTable.collec_name]

GET_COMPANY_OPERATION = "GET COMPANY DETAILS"
ADD_COMPANY_OPERATION = "ADD COMPANY DETAILS"
DELETE_COMPANY_OPERATION = "DELETE COMPANY DETAILS"
COMPANY_LOGO_CHANGED = "COMPANY LOGO CHANGED"
UPDATE_COMPANY_OPERATION = "UPDATE COMPANY DETAILS"


@company.route('', methods=['GET'])
def get_company_details():
    ip_addr = request.remote_addr
    details = companycollec.find_one()
    if details is None:
        return send_response(True, msg="No Company available to get")
    details[CompanyTable.logo] = str(details[CompanyTable.logo])
    del details['_id']
    audit(operation_type=GET_COMPANY_OPERATION, performed_by=ip_addr)
    return send_response(True, data=details)


@company.route('', methods=['POST'])
def add_company_details():
    try:
        ip_addr = request.remote_addr
        audit(operation_type=ADD_COMPANY_OPERATION, performed_by=ip_addr)
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
        data = {CompanyTable.company_name: companyname, CompanyTable.logo: logo_id, CompanyTable.desc: description}
        companycollec.insert_one(data)
        audit(operation_type=ADD_COMPANY_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="Data entered"), 200
    except Exception as e:
        return send_response(False, msg="failed due to some error, Try again if you are patient"), 500


@company.route('', methods=['PUT'])
def update_company_details():
    try:
        ip_addr = request.remote_addr
        details = companycollec.find_one()
        if details is None:
            return send_response(True, msg="No Company available to update"), 200
        companyname = request.form.get('companyname')
        if companyname == "":
            return send_response(False, msg="Don't you need a company name"), 422
        data = {"companyname": companyname, "description": request.form.get('description', "")}
        if 'companylogo' in request.files:
            audit(operation_type=COMPANY_LOGO_CHANGED, performed_by=ip_addr)
            logo = request.files.get('companylogo')
            fs.delete(details[CompanyTable.logo])
            logo_id = fs.put(logo)
            data[CompanyTable.logo] = logo_id
        newvalues = {"$set": data}
        companycollec.update_one(details, newvalues)
        audit(operation_type=UPDATE_COMPANY_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="Data updated"), 200
    except Exception as e:
        return send_response(False, msg="failed due to some error, Try again if you are patient"), 500


@company.route('', methods=["DELETE"])
def delete_company_details():
    try:
        ip_addr = request.remote_addr
        details = companycollec.find_one()
        if details is None:
            return send_response(True, msg="No Company available to delete"), 200
        companycollec.delete_one(details)
        audit(operation_type=DELETE_COMPANY_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="Deleted Successfully"), 200
    except Exception as e:
        return send_response(False, msg="failed due to some error, Try again if you are patient"), 500
