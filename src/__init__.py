from flask import Flask
from .actions.CompanyAction import company
from .actions.CategoryAction import category

app = Flask(__name__)
app.register_blueprint(company)
app.register_blueprint(category)