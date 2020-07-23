from flask import Flask, send_file
from .actions.CompanyAction import company
from .actions.CategoryAction import category
from .actions.CustomerAction import customer
from src.Configurations.MongoClient import bmsdb, fs
from bson.objectid import ObjectId
from src.utils.UsualUtil import send_response
from flask_cors import CORS
from src.utils.UsualUtil import valid_object_id
from src.actions.PurchaseAction import purchase

app = Flask(__name__)
CORS(app)
app.register_blueprint(company)
app.register_blueprint(category)
app.register_blueprint(customer)
app.register_blueprint(purchase)


@app.route("/image/<imageid>", methods=["GET"])
def getimage(imageid):
    if not valid_object_id(imageid):
        return send_response(False, msg="Not a valid image id")
    if fs.exists(ObjectId(imageid)):
        image = fs.get(ObjectId(imageid))
        return send_file(image, mimetype="image/png")
    else:
        return send_response(False, msg="Image not available")
