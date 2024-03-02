from datetime import datetime, timedelta
import json
import secrets
from app import search
#from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.libs.strings import gettext
from app.libs import image_helper
from app import current_user
from flask_uploads import UploadNotAllowed
from app.model import Product, Brand, Category, Order as CustomerOrder, User
from flask import request,session,redirect, flash,jsonify, send_file
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
import os

from app.schema.product import ProductSchema
from flask_restful import Resource

product_schema = ProductSchema()

def only_name(path):
    name = str()
    for i in path:
        if i == '\\' or i == '/':
            name = path[i:1]
            return name
            
        else:
            return path
        
"""             
def post(cls, user_id: int):
        data = image_schema.load(request.files)
        folder = f"user_{user_id}"
        try:
            image_path = image_helper.save_image(data["image"], folder=folder)
            basename = image_helper.get_basename(image_path)
            return {"message": gettext("image_uploaded").format(basename)}, 201
        except UploadNotAllowed:
            extenstion = image_helper.get_extension(data["image"])
            return {
                "message": gettext("image_illegal_extension").format(extenstion)
            }, 400 """

class AddProductResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def post(cls):
        product = Product(**request.form)
        if product:
            folder = f"product_{product.vendor_id}"
            try:
                product.image_1 = image_helper.get_basename(image_helper.save_image(request.files.get('image_1'), folder=folder, name=secrets.token_hex(10) + "."))
                basename = product.image_1
                #saving to database
                product.save_to_db() 
                return {"message": gettext("image_uploaded").format(basename)}, 201
            except UploadNotAllowed:
                extenstion = image_helper.get_extension(request.files.get('image_1'))
                return {
                    "message": gettext("image_illegal_extension").format(extenstion)
                }, 400 
            # saving images before uploading to database
            #product.image_1 = image_helper.save_image(request.files.get('image_1'), folder=folder, name=secrets.token_hex(10) + ".")
            
            #product_schema.image2 = image_set.save(request.files.get('image_1'), name=secrets.token_hex(10) + ".")
            #product_schema.image3 = image_set.save(request.files.get('image_1'), name=secrets.token_hex(10) + ".")
            
            
            
        return {"message":"Product not created"}, 201 #success message
    
   
class ProductView(Resource):
    @classmethod
    def get(cls):
        products = Product.query.all() #add additional order by rating later in development
        
        if products:
            product_data = [product_schema.dump(product) for product in products]
            return jsonify(product_data)
        return {"message":"no product available"},400
        


# product of a seller
class VendoersProductView(Resource):
    @classmethod
    def get(cls, id):
        
        products = Product.find_by_seller_id(id) #add additional order by rating later in development
        if products:
            product_data = [product_schema.dump(product) for product in products]
            return jsonify(product_data)
        return {"message":"no product available"}
        
    
class SingleProductResource(Resource):
    @classmethod
    def get(cls,id):
        main_product = Product.find_by_id(id)
        sup_product = Product.query.filter_by(name=main_product.name)
        related_product = Product.query.filter_by(Product.category == main_product.category, main_product.id != id).all()
        return {"message": "single item page successful"}

class SearchProduct(Resource):
    @classmethod
    def get(cls):
    #selecting input from search
        searchword = request.args.get("q")
        #quarying database for search items
        products = Product.query.msearch(searchword, fields=['product_name','desc'])
        product = [product_schema.dump(product) for product in products]      
        return jsonify(product)
        
        
        
        
        
        