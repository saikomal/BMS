from src.Configurations.MongoClient import bmsdb, fs, customerDB
from flask import Blueprint, request
from src.utils.UsualUtil import send_response
from src.utils.CustomerUtil import checkph

customer = Blueprint('customer', __name__, url_prefix="/customer")

custcollec = bmsdb[customerDB]
#custcollec.createIndex( { "custphone": 1 },{unique:true})
@customer.route('', methods=['GET'])
def get_customer_details():
    details = list(custcollec.find())
    print(details)
    if details is None:
        return send_response(True, msg="No customer available to get")
    return send_response(True, data=details)


@customer.route('', methods=['PUT'])
def update_customer_details():
    custph = request.form.get('custphone')
    if(checkph(custph)):
        return send_response(True, msg="No given customer avaliable "), 200
        exit(0)
    details = {"_id": custph}
    try:
        data = request.form.to_dict()
        newvalues = {"$set": data}
        custcollec.update_one(details, newvalues)
        return send_response(True, msg="Data updated"), 200
    except Exception as e:
        return send_response(False, msg="failed due to some error, Try again if you are patient"), 500


@customer.route('', methods=['DELETE'])
def delete_customer_details():
    custph = request.form.get('custphone')
    if(checkph(custph)):
        return send_response(True, msg="No given customer avaliable "), 200
        exit(0)
    details={"_id" : custph}
    custcollec.delete_one(details)
    return send_response(True, msg="customer deleted"), 200

@customer.route('', methods=['POST'])
def add_customer_details():
    try:
        custname=request.form.get('customername')
        custadd=request.form.get('customeradd')
        custph=request.form.get('custphone')
        comments=request.form.get('comments')
        points=request.form.get('points')
        data = {'customername': custname, 'customeradd': custadd, '_id': custph, 'comments': comments, 'points': points}
        print(custph)
        if(custph == None):
            return send_response(True, msg="phoneno must be given"), 200
            exit(0)
        custcollec.insert_one(data)
        return send_response(True, msg="Data entered"), 200
    except Exception as e:
        return send_response(False, msg="failed due to sdfdsome error, Try again if you are patient"), 500

