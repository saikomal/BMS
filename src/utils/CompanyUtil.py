from src.Configurations.MongoClient import bmsdb
from src.Configurations.Companytable import CompanyTable

def company_exists():
    return False if bmsdb[CompanyTable.collec_name].find_one() is None else True