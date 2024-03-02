from datetime import datetime, timedelta
import json
from flask import request, jsonify
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.model import Favorite
from app.schema.favorite import FavoriteSchema
from flask_restful import Resource

favorite_schema = FavoriteSchema()
favorite_list_schema = FavoriteSchema(many=True)


class AddFavoriteResourse(Resource):
    @classmethod
    def get(cls,_id:int):
        favorite = Favorite.find_by_client_id(_id)
        if favorite:
            #cart = [cart_schema.dump(cart) for cart in carts]       
            return favorite_list_schema.dump(favorite) 
        return {"message":"no cart avaliable"}, 400
    
class FavoriteResource(Resource):
    @classmethod
    def get(cls,_id:int):
        favorite = Favorite.find_by_client_id(_id)
        if favorite:
            #cart = [cart_schema.dump(cart) for cart in carts]       
            return favorite_schema.dump(favorite) 
        return {"message":"no favorite avaliable"}, 400
    
class FavoriteUpdateResource(Resource):
    @classmethod
    def put(cls, _id):
        cart_json = request.get_json()
        favorite = Favorite.find_by_id(_id)
        if favorite:
            favorite.quantity = cart_json["quantity"]
            favorite.save_to_db()
            return {"message":"favorite updated."}
        else:
            return {"message":"favorite not available."}
    
class FavoriteDeleteResource(Resource):
    @classmethod
    def delete(cls,_id:int):
        favorite = Favorite.find_by_id(_id)
        if favorite:
            favorite.delete_from_db()
            return {"message": "favorite deleted."}
        return {"message": "favorite not found."}, 404

