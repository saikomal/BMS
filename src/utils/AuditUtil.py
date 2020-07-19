from src.Configurations.AuditTable import AuditTable
from src.Configurations.MongoClient import bmsdb
import time
def audit(operation_type, performed_by, reason=""):
    collec = bmsdb[AuditTable.collec_name]
    collec.insert_one({AuditTable.operation: operation_type, AuditTable.time: time.time(),
                       AuditTable.performed_by: performed_by, AuditTable.reason: reason})
