def send_response(status, msg="", data=""):
    return {
        "message": msg,
        "status": "Success" if status else "Fail",
        "data": data
    }
