from datetime import datetime, timedelta
import json
from flask import request, jsonify
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.model import Category
from app.schema.category import CategorySchema
from flask_restful import Resource

category_schema = CategorySchema()

class CategoryResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def get(cls):
        categories = Category.query.all()
        if categories:
            category = [category_schema.dump(category) for category in categories]       
            return jsonify(category) 
        return {"message":"no category avaliable"}, 400
    

