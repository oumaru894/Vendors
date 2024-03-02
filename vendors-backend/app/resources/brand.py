from datetime import datetime, timedelta
import json
from app.model import Brand, Product
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.brand import BrandSchema
from flask_restful import Resource

Brand_schema = BrandSchema()

def brand():
    brand = Brand.query.join(Product, (Brand.id==Product.brand)).all
    return brand

class BrandResource(Resource):
    '''handle http request  from schema'''
    @classmethod
    def post(cls):
        brand_data = Brand_schema.load(request.get_json()) #converting json from schema to python data
        
        if brand_data.find_by_brandname(brand_data.brand_name):
            return{"message": "Brand already exist"}
        
        #saving to database
        
        brand_data.save_to_db()
        return {"message": "Brand created successfully "}, 201 #success message
    
    
        
