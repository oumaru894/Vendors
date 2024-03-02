from datetime import datetime, timedelta
import json
from flask import request, jsonify
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.model import Cart
from app.schema.cart import CartSchema
from flask_restful import Resource

cart_schema = CartSchema()
cart_list_schema = CartSchema(many=True)



    
class CartResource(Resource):
    @classmethod
    def get(cls,_id:int):
        carts = Cart.find_by_client_id(_id)
        if carts:
            #cart = [cart_schema.dump(cart) for cart in carts]       
            return cart_list_schema.dump(carts) 
        return {"message":"no cart avaliable"}, 400
    
class CartUpdateResource(Resource):
    @classmethod
    def put(cls, _id):
        
        cart_json = request.get_json()
        cart = Cart.find_by_id(_id)
        print(cart_json)
        if cart:
            #print(exist.cart_id)
            cart.quantity = cart_json["quantity"]
            print("new",cart.quantity)
            cart.save_to_db()
            return {"message":"cart updated."}
        else:
            return {"message":"cart not available."}
    
class CartDeleteResource(Resource):
    @classmethod
    def delete(cls,_id:int):
        print(_id,'id')
        cart = Cart.find_by_id(_id)
        
        if cart:
            cart.delete_from_db()
            
            return {"message": "cart deleted."}
        return {"message": "cart not found."}, 404


class AddCartResourse(Resource):
    @classmethod
    def post(cls):
        carts = cart_schema.load(request.get_json())
        cart_json = request.get_json()
        if carts:
            id = cart_json["product_id"]
            sec_id = cart_json["secondary_id"]
            print("id",id)
            exist = Cart.find_by_secondary_id(sec_id)
            if exist: 
                # Update quantity
                print(exist.cart_id)
                return{"message":"cart already exist"}, 204 
            carts.save_to_db()
            return {"message":"cart added sucessfully"}, 201
        return {"message":"something went wrong"}, 400

        
    

