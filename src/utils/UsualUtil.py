from bson.objectid import ObjectId


def send_response(status, msg="", data=""):
    return {
        "message": msg,
        "status": "Success" if status else "Fail",
        "data": data
    }


def valid_object_id(id):
    return True if ObjectId.is_valid(id) else False
