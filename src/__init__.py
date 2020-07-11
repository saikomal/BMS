from flask import Flask, send_file
from .actions.CompanyAction import company
from .actions.CategoryAction import category
from src.Configurations.MongoClient import bmsdb, fs, companyDB
from bson.objectid import ObjectId

app = Flask(__name__)
app.register_blueprint(company)
app.register_blueprint(category)


@app.route("/image/<imageid>", methods=["GET"])
def getimage(imageid):
    print(imageid)
    image = fs.get(ObjectId(imageid))
    print(image)
    return send_file(image, mimetype="image/png")
