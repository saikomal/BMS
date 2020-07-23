from src.Configurations.MongoClient import bmsdb, fs
from flask import Blueprint, request
from src.utils.UsualUtil import send_response
from src.utils.CustomerUtil import user_exists
from src.utils.AuditUtil import audit
from src.Configurations.CustomerTable import CustomerTable
from src.utils.CustomerUtil import get_specified_customer_details
from src.utils.AuditUtil import audit

GET_CUSTOMER_OPERATION = "GET CUSTOMER DETAILS"
GET_CUSTOMER_OPERATION1 = "GET REQUESTED CUSTOMER DETAILS"
ADD_CUSTOMER_OPERATION = "ADD CUSTOMER DETAILS"
DELETE_CUSTOMER_OPERATION = "DELETE CUSTOMER DETAILS"
UPDATE_CUSTOMER_OPERATION = "UPDATE CUSTOMER DETAILS"

customer = Blueprint('customer', __name__, url_prefix="/customer")

custcollec = bmsdb[CustomerTable.collecname]


@customer.route('', methods=['GET'])
def get_customer_details():
    ip_addr = request.remote_addr
    sin = int(request.form.get("sin","0"))
    no_of_rows = int(request.form.get("no_of_rows","50"))
    if sin<0:
        sin=0
    if no_of_rows==-1:
        details = list(custcollec.find().skip(sin))
    else:
        details = list(custcollec.find().skip(sin).limit(no_of_rows))
    if len(details)==0:
        audit(operation_type=GET_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="No customer available to get"), 200
    audit(operation_type=GET_CUSTOMER_OPERATION, performed_by=ip_addr)
    return send_response(True, data={"customer_details":details,"total_count":custcollec.count()})


@customer.route('/get_requested_customer_details/<custph>', methods=['GET'])
def get_requested_customer_details(custph):
    ip_addr = request.remote_addr
    if (custph == None):
        return send_response(True, msg="phoneno must be given"), 200
    try:
        custph1 = int(custph)
    except:
        audit(operation_type=GET_CUSTOMER_OPERATION1, performed_by=ip_addr)
        return send_response(False,msg="Invalid number")
    if get_specified_customer_details(custph).count() == 0:
        audit(operation_type=GET_CUSTOMER_OPERATION1, performed_by=ip_addr)
        return send_response(True, msg="No requested customer available to get"), 200
    audit(operation_type=GET_CUSTOMER_OPERATION1, performed_by=ip_addr)
    return send_response(True, data=list(get_specified_customer_details(custph)))


@customer.route('', methods=['PUT'])
def update_customer_details():
    ip_addr = request.remote_addr
    data={}
    data.update(customername =request.form.get('customername'))
    data.update(custadd=request.form.get('customeradd'))
    data.update(custph=request.form.get('custphone'))
    data.update(comments=request.form.get('comments'))
    data.update(points=request.form.get('points'))
    custph=request.form.get('custphone')
    if (custph == None):
        audit(operation_type=UPDATE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="phoneno must be given"), 200
    if not user_exists(custph):
        audit(operation_type=UPDATE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="No given customer available to update"), 200
    try:
        custph1 = int(custph)
    except:
        audit(operation_type=UPDATE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(False,msg="Invalid number")
    details = {"_id": custph}
    try:
        newvalues = {"$set": data}
        custcollec.update_one(details, newvalues)
        audit(operation_type=UPDATE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="Data updated"), 200
    except Exception as e:
        audit(operation_type=UPDATE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(False, msg="failed due to some error, Try again if you are patient"), 500


@customer.route('<custph>', methods=['DELETE'])
def delete_customer_details(custph):
    ip_addr = request.remote_addr
    if not user_exists(custph):
        audit(operation_type=DELETE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(True, msg="No given customer avaliable to delete"), 200
    try:
        custph1 = int(custph)
    except:
        audit(operation_type=DELETE_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(False,msg="Invalid number")
    details = {"_id": custph}
    custcollec.delete_one(details)
    audit(operation_type=DELETE_CUSTOMER_OPERATION, performed_by=ip_addr)
    return send_response(True, msg="customer deleted"), 200


@customer.route('', methods=['POST'])
def add_customer_details():
    ip_addr = request.remote_addr
    try:
        custname = request.form.get('customername')
        custadd = request.form.get('customeradd')
        custph = request.form.get('custphone')
        comments = request.form.get('comments')
        points = request.form.get('points')
        data = {'customername': custname, 'customeradd': custadd, '_id': custph, 'comments': comments, 'points': points}
        print(custph)
        if (custph == None):
            audit(operation_type=ADD_CUSTOMER_OPERATION, performed_by=ip_addr)
            return send_response(True, msg="phoneno must be given"), 200
        if user_exists(custph):
            audit(operation_type=ADD_CUSTOMER_OPERATION, performed_by=ip_addr)
            return send_response(True, msg="Given customer already exists"), 200
        try:
            custph1 = int(custph)
        except:
            audit(operation_type=ADD_CUSTOMER_OPERATION, performed_by=ip_addr)
            return send_response(False, msg="Invalid number")
        custcollec.insert_one(data)
        return send_response(True, msg="Data entered"), 200
    except Exception as e:
        audit(operation_type=ADD_CUSTOMER_OPERATION, performed_by=ip_addr)
        return send_response(False, msg="failed due to sdfdsome error, Try again if you are patient"), 500
