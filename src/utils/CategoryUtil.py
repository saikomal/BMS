from src.Configurations.MongoClient import bmsdb
from src.Configurations.CategoryTable import CategoryTable
from bson.objectid import ObjectId
from src.utils.UsualUtil import valid_object_id


def category_exists(category_name, parent_id):
    return True if bmsdb[CategoryTable.collec_name].find(
        {CategoryTable.category_name: category_name, CategoryTable.parent_id: parent_id}).count() > 0 else False


def valid_cat_id(parent_id):
    return True if valid_object_id(parent_id) and bmsdb[CategoryTable.collec_name].find(
        {"_id": ObjectId(parent_id)}).count() == 1 else False


def valid_parent_for_category(category_id, parent_id):
    """
    Check if the parentId is not one the category children to prevent cycle
    """
    _, child_ids = get_all_children(category_id)
    return False if parent_id in child_ids else True


def get_all_children_ids(ch, children):
    for c in ch:
        children.append(str(c["_id"]))
        get_all_children_ids(c.get("children", ""), children)


def get_children(parent_id):
    pipeline = [{"$addFields": {"id": {"$toString": "$_id"}}}, {"$match": {"Parent": parent_id}},
                {"$project": {"_id": 0}}]
    return list(bmsdb["Category"].aggregate(pipeline))


def get_all_children(cat_id=""):
    children = get_children(cat_id)
    ids = [c["id"] for c in children]

    def get_all_children1(children):
        for child in children:
            child["children"] = get_children(child["id"])
            ids.append(child["id"])
            get_all_children1(child["children"])

    get_all_children1(children)
    return children, ids
